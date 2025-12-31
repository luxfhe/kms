/**
 * @luxfhe/kms - LuxFHE Key Management System
 *
 * Provides threshold FHE key management for decentralized decryption.
 * Integrates with LuxFHE KMS server for distributed key generation and decryption.
 */

export interface KMSConfig {
  /** KMS server URL */
  serverUrl: string;
  /** Number of threshold parties */
  threshold?: number;
  /** Total number of parties */
  parties?: number;
}

export interface ThresholdParty {
  id: number;
  publicKey: string;
  endpoint?: string;
}

export interface DecryptionRequest {
  ciphertext: string;
  requestId?: string;
}

export interface DecryptionResponse {
  requestId: string;
  status: 'pending' | 'completed' | 'failed';
  result?: bigint;
  error?: string;
}

export interface KeyGenRequest {
  threshold: number;
  parties: number;
}

export interface KeyGenResponse {
  publicKey: string;
  keyId: string;
  parties: ThresholdParty[];
}

/**
 * LuxFHE KMS Client
 *
 * Manages threshold FHE keys and coordinates decentralized decryption.
 */
export class KMSClient {
  private config: KMSConfig;
  private publicKey: string | null = null;
  private keyId: string | null = null;
  private parties: ThresholdParty[] = [];

  constructor(config: KMSConfig) {
    this.config = {
      ...config,
      serverUrl: config.serverUrl.replace(/\/$/, ''),
    };
  }

  /**
   * Check KMS server health
   */
  async health(): Promise<{ status: string; threshold: boolean; parties: number }> {
    const res = await fetch(`${this.config.serverUrl}/health`);
    if (!res.ok) throw new Error(`KMS health check failed: ${res.status}`);
    return res.json();
  }

  /**
   * Generate new threshold key set
   */
  async generateKeys(request?: KeyGenRequest): Promise<KeyGenResponse> {
    const req = {
      threshold: request?.threshold || this.config.threshold || 3,
      parties: request?.parties || this.config.parties || 5,
    };

    const res = await fetch(`${this.config.serverUrl}/keygen`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Key generation failed: ${text}`);
    }

    const data = await res.json();
    this.publicKey = data.publicKey;
    this.keyId = data.keyId;
    this.parties = data.parties;

    return data;
  }

  /**
   * Get the current public key
   */
  async getPublicKey(): Promise<string> {
    if (this.publicKey) return this.publicKey;

    const res = await fetch(`${this.config.serverUrl}/publickey`);
    if (!res.ok) throw new Error(`Failed to fetch public key: ${res.status}`);

    const buffer = await res.arrayBuffer();
    this.publicKey = btoa(String.fromCharCode(...new Uint8Array(buffer)));
    return this.publicKey;
  }

  /**
   * Get threshold parties information
   */
  async getParties(): Promise<ThresholdParty[]> {
    if (this.parties.length > 0) return this.parties;

    const res = await fetch(`${this.config.serverUrl}/threshold/parties`);
    if (!res.ok) throw new Error(`Failed to fetch parties: ${res.status}`);

    this.parties = await res.json();
    return this.parties;
  }

  /**
   * Request threshold decryption
   *
   * This initiates the MPC decryption protocol where t-of-n parties
   * contribute partial decryptions to reconstruct the plaintext.
   */
  async requestDecryption(request: DecryptionRequest): Promise<DecryptionResponse> {
    const res = await fetch(`${this.config.serverUrl}/threshold/decrypt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ciphertext: request.ciphertext,
        requestId: request.requestId || crypto.randomUUID(),
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Decryption request failed: ${text}`);
    }

    return res.json();
  }

  /**
   * Poll for decryption result
   */
  async getDecryptionResult(requestId: string): Promise<DecryptionResponse> {
    const res = await fetch(`${this.config.serverUrl}/threshold/result/${requestId}`);
    if (!res.ok) throw new Error(`Failed to get result: ${res.status}`);
    return res.json();
  }

  /**
   * Wait for decryption to complete
   */
  async waitForDecryption(
    requestId: string,
    options?: { timeout?: number; pollInterval?: number }
  ): Promise<bigint> {
    const timeout = options?.timeout || 30000;
    const pollInterval = options?.pollInterval || 1000;
    const start = Date.now();

    while (Date.now() - start < timeout) {
      const result = await this.getDecryptionResult(requestId);

      if (result.status === 'completed' && result.result !== undefined) {
        return result.result;
      }

      if (result.status === 'failed') {
        throw new Error(`Decryption failed: ${result.error}`);
      }

      await new Promise((r) => setTimeout(r, pollInterval));
    }

    throw new Error('Decryption timeout');
  }
}

/**
 * Create a new KMS client
 */
export function createKMSClient(
  serverUrl = 'https://kms.lux.network',
  options?: Partial<KMSConfig>
): KMSClient {
  return new KMSClient({
    serverUrl,
    ...options,
  });
}

// Initialize function for compatibility with v1-sdk
let initialized = false;
let defaultClient: KMSClient | null = null;

export async function init(config?: { serverUrl?: string }): Promise<KMSClient> {
  if (initialized && defaultClient) {
    return defaultClient;
  }

  defaultClient = createKMSClient(config?.serverUrl);
  await defaultClient.health();
  initialized = true;

  return defaultClient;
}

export function isInitialized(): boolean {
  return initialized;
}

export default init;
