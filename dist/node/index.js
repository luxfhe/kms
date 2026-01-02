// src/node.ts
async function generateKeyPair() {
  throw new Error("KMS key generation not yet implemented. Use @luxfhe/wasm directly.");
}
async function encrypt(data, publicKey) {
  throw new Error("KMS encryption not yet implemented. Use @luxfhe/wasm directly.");
}
async function decrypt(ciphertext, privateKey) {
  throw new Error("KMS decryption not yet implemented. Use @luxfhe/wasm directly.");
}
var MlKemPkePk = class {
  data;
  constructor(data) {
    this.data = data || new Uint8Array();
  }
  toBytes() {
    return this.data;
  }
};
var MlKemPkeSk = class {
  data;
  constructor(data) {
    this.data = data || new Uint8Array();
  }
  toBytes() {
    return this.data;
  }
};
function u8vec_to_ml_kem_pke_pk(bytes) {
  return new MlKemPkePk(bytes);
}
function u8vec_to_ml_kem_pke_sk(bytes) {
  return new MlKemPkeSk(bytes);
}
function new_client(serverUrl, options) {
  return {
    serverUrl,
    options,
    // Stub methods
    request: async () => ({ success: true })
  };
}
function new_server_id_addr(address) {
  return { address };
}
function process_user_decryption_resp_from_js(response, sk) {
  return new Uint8Array();
}
function ml_kem_pke_keygen() {
  const pk = new MlKemPkePk(new Uint8Array(32));
  const sk = new MlKemPkeSk(new Uint8Array(32));
  return { pk, sk };
}
function ml_kem_pke_pk_to_u8vec(pk) {
  return pk.toBytes();
}
function ml_kem_pke_sk_to_u8vec(sk) {
  return sk.toBytes();
}
function ml_kem_pke_get_pk(sk) {
  return new MlKemPkePk();
}
async function initKMS(options) {
}
export {
  MlKemPkePk,
  MlKemPkeSk,
  decrypt,
  initKMS as default,
  encrypt,
  generateKeyPair,
  ml_kem_pke_get_pk,
  ml_kem_pke_keygen,
  ml_kem_pke_pk_to_u8vec,
  ml_kem_pke_sk_to_u8vec,
  new_client,
  new_server_id_addr,
  process_user_decryption_resp_from_js,
  u8vec_to_ml_kem_pke_pk,
  u8vec_to_ml_kem_pke_sk
};
