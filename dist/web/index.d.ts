/**
 * LuxFHE KMS Web bindings
 *
 * Native Go FHE key management for browser
 * Includes backward-compatible exports for legacy TKMS interface
 */
interface KeyPair {
    publicKey: Uint8Array;
    privateKey: Uint8Array;
}
interface EncryptionResult {
    ciphertext: Uint8Array;
    publicKey: Uint8Array;
}
/**
 * InitInput type for backward compatibility with legacy TKMS
 */
type InitInput = string | URL | Request | Response | ArrayBuffer | WebAssembly.Module;
declare const InitInput: InitInput;
/**
 * Generate a new FHE key pair
 */
declare function generateKeyPair(): Promise<KeyPair>;
/**
 * Encrypt data with the public key
 */
declare function encrypt(data: Uint8Array, publicKey: Uint8Array): Promise<EncryptionResult>;
/**
 * Decrypt data with the private key
 */
declare function decrypt(ciphertext: Uint8Array, privateKey: Uint8Array): Promise<Uint8Array>;
/**
 * ML-KEM Public Key type
 */
declare class MlKemPkePk {
    private data;
    constructor(data?: Uint8Array);
    toBytes(): Uint8Array;
}
/**
 * ML-KEM Secret Key type
 */
declare class MlKemPkeSk {
    private data;
    constructor(data?: Uint8Array);
    toBytes(): Uint8Array;
}
/**
 * Convert Uint8Array to ML-KEM public key
 */
declare function u8vec_to_ml_kem_pke_pk(bytes: Uint8Array): MlKemPkePk;
/**
 * Convert Uint8Array to ML-KEM secret key
 */
declare function u8vec_to_ml_kem_pke_sk(bytes: Uint8Array): MlKemPkeSk;
/**
 * Create a new KMS client
 */
declare function new_client(serverUrl: string, options?: any): any;
/**
 * Create a new server ID address
 */
declare function new_server_id_addr(address: string): any;
/**
 * Process user decryption response
 */
declare function process_user_decryption_resp_from_js(response: any, sk: MlKemPkeSk): Uint8Array;
/**
 * Generate ML-KEM key pair
 */
declare function ml_kem_pke_keygen(): {
    pk: MlKemPkePk;
    sk: MlKemPkeSk;
};
/**
 * Convert ML-KEM public key to Uint8Array
 */
declare function ml_kem_pke_pk_to_u8vec(pk: MlKemPkePk): Uint8Array;
/**
 * Convert ML-KEM secret key to Uint8Array
 */
declare function ml_kem_pke_sk_to_u8vec(sk: MlKemPkeSk): Uint8Array;
/**
 * Get public key from key pair
 */
declare function ml_kem_pke_get_pk(sk: MlKemPkeSk): MlKemPkePk;
/**
 * Default export matching legacy TKMS init signature
 */
declare function initKMS(options?: {
    module_or_path?: InitInput;
}): Promise<void>;

export { type EncryptionResult, InitInput, type KeyPair, MlKemPkePk, MlKemPkeSk, decrypt, initKMS as default, encrypt, generateKeyPair, ml_kem_pke_get_pk, ml_kem_pke_keygen, ml_kem_pke_pk_to_u8vec, ml_kem_pke_sk_to_u8vec, new_client, new_server_id_addr, process_user_decryption_resp_from_js, u8vec_to_ml_kem_pke_pk, u8vec_to_ml_kem_pke_sk };
