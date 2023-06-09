(use-trait holo-trait 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.holotrait.holo-trait)

(define-constant holo-owner tx-sender)
(define-constant err-not-token-owner (err u100))
(define-data-var ipfs-root (string-ascii 80) "ipfs://QmaejQXudVNHxyubms1jiSs6gRNUukPbM4Yj4WWLGwesKN/")
(define-constant err-owner-only (err 200))
(define-data-var holo-nonce uint u0)

(define-non-fungible-token holonft uint)

(define-read-only (get-last-token-id)
 (ok (var-get holo-nonce))
)

(define-read-only (get-token-uri (token-id uint))
  (ok (some (concat (concat (var-get ipfs-root) "{id}") ".json"))))

(define-read-only (get-owner (token-id uint))
	(ok (nft-get-owner? holonft token-id))
)

(define-public (transfer (token-id uint) (sender principal) (recipient principal))
 ;;#[allow(unchecked_data)]
	(begin
		(asserts! (is-eq tx-sender sender) err-not-token-owner)
		(nft-transfer? holonft token-id sender recipient)
	)
)

(define-private (mint (recipient principal))
	(let ((token-id (+ (var-get holo-nonce) u1)))
		(asserts! (is-eq tx-sender holo-owner) err-owner-only)
		 ;;#[filter(token-id, recipient)]
		(try! (nft-mint? holonft token-id recipient))
		(asserts! (var-set holo-nonce token-id) err-token-id-failure)
		(ok token-id)
	)
)

