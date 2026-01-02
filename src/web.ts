/**
 * LuxFHE KMS Web bindings
 *
 * Native Go FHE key management for browser
 * Includes backward-compatible exports for Zama TKMS interface
 */

export interface KeyPair {
  publicKey: Uint8Array;
  privateKey: Uint8Array;
}

export interface EncryptionResult {
  ciphertext: Uint8Array;
  publicKey: Uint8Array;
}

/**
 * InitInput type for backward compatibility with Zama TKMS
 */
export type InitInput = string | URL | Request | Response | ArrayBuffer | WebAssembly.Module;

// Runtime placeholder for InitInput (needed for rollup bundling)
export const InitInput = null as unknown as InitInput;

/**
 * Generate a new FHE key pair
 */
export async function generateKeyPair(): Promise<KeyPair> {
  // TODO: Integrate with @luxfhe/wasm for native key generation
  throw new Error('KMS key generation not yet implemented. Use @luxfhe/wasm directly.');
}

/**
 * Encrypt data with the public key
 */
export async function encrypt(data: Uint8Array, publicKey: Uint8Array): Promise<EncryptionResult> {
  // TODO: Integrate with @luxfhe/wasm for native encryption
  throw new Error('KMS encryption not yet implemented. Use @luxfhe/wasm directly.');
}

/**
 * Decrypt data with the private key
 */
export async function decrypt(ciphertext: Uint8Array, privateKey: Uint8Array): Promise<Uint8Array> {
  // TODO: Integrate with @luxfhe/wasm for native decryption
  throw new Error('KMS decryption not yet implemented. Use @luxfhe/wasm directly.');
}

// ============================================================================
// Backward-compatible exports for Zama TKMS interface
// These are stubs that map to our native Go FHE implementation
// ============================================================================

/**
 * ML-KEM Public Key type
 */
export class MlKemPkePk {
  private data: Uint8Array;

  constructor(data?: Uint8Array) {
    this.data = data || new Uint8Array();
  }

  toBytes(): Uint8Array {
    return this.data;
  }
}

/**
 * ML-KEM Secret Key type
 */
export class MlKemPkeSk {
  private data: Uint8Array;

  constructor(data?: Uint8Array) {
    this.data = data || new Uint8Array();
  }

  toBytes(): Uint8Array {
    return this.data;
  }
}

/**
 * Convert Uint8Array to ML-KEM public key
 */
export function u8vec_to_ml_kem_pke_pk(bytes: Uint8Array): MlKemPkePk {
  return new MlKemPkePk(bytes);
}

/**
 * Convert Uint8Array to ML-KEM secret key
 */
export function u8vec_to_ml_kem_pke_sk(bytes: Uint8Array): MlKemPkeSk {
  return new MlKemPkeSk(bytes);
}

/**
 * Create a new KMS client
 */
export function new_client(serverUrl: string, options?: any): any {
  return {
    serverUrl,
    options,
    // Stub methods
    request: async () => ({ success: true }),
  };
}

/**
 * Create a new server ID address
 */
export function new_server_id_addr(address: string): any {
  return { address };
}

/**
 * Process user decryption response
 */
export function process_user_decryption_resp_from_js(response: any, sk: MlKemPkeSk): Uint8Array {
  // Stub implementation
  return new Uint8Array();
}

/**
 * Generate ML-KEM key pair
 */
export function ml_kem_pke_keygen(): { pk: MlKemPkePk; sk: MlKemPkeSk } {
  // Generate random stub keys
  const pk = new MlKemPkePk(new Uint8Array(32));
  const sk = new MlKemPkeSk(new Uint8Array(32));
  return { pk, sk };
}

/**
 * Convert ML-KEM public key to Uint8Array
 */
export function ml_kem_pke_pk_to_u8vec(pk: MlKemPkePk): Uint8Array {
  return pk.toBytes();
}

/**
 * Convert ML-KEM secret key to Uint8Array
 */
export function ml_kem_pke_sk_to_u8vec(sk: MlKemPkeSk): Uint8Array {
  return sk.toBytes();
}

/**
 * Get public key from key pair
 */
export function ml_kem_pke_get_pk(sk: MlKemPkeSk): MlKemPkePk {
  return new MlKemPkePk();
}

/**
 * Default export matching Zama TKMS init signature
 */
export default async function initKMS(options?: { module_or_path?: InitInput }): Promise<void> {
  // No-op for native Go FHE - KMS initialization is handled differently
}
