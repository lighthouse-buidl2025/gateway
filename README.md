

# 📄 Gateway API Index

**Base URL:** `http://localhost:8000/api`

| No. | HTTP Method | Endpoint | Description |
| --- | ----------- | -------- | ----------- |
| 1   | `GET`       | `/ping`  | Health check to verify server status |
| 2   | `GET`       | `/persona-engine/update/:address` | Perform live wallet analysis (non-cached) |
| 3   | `GET`       | `/persona-engine/wallet/:address` | Retrieve cached wallet analysis |
| 4   | `GET`       | `/persona-engine/category/:group` | Retrieve most interacted contracts per persona group |
| 5   | `GET`       | `/user/:address` | Get user info by wallet address |
| 6   | `POST`      | `/user/signup` | Register user using wallet address |
| 7   | `POST`      | `/user/email/:address` | Register or update email |
| 8   | `POST`      | `/user/telegram/:address` | Register or update Telegram |
| 9   | `GET`       | `/tx-agent/agent` | Get current Agent (CA) address |
| 10  | `POST`      | `/tx-agent/createAccount` | Create account for user wallet |
| 11  | `POST`      | `/tx-agent/executeTransaction` | Execute transaction |
| 12  | `POST`      | `/tx-agent/createAgentRule` | Create auto-execution rule |
| 13  | `GET`       | `/tx-agent/getRules/:address` | Retrieve rules by user address |
| 14  | `GET`       | `/eliza-agent/agents` | Get all registered Eliza agents |
| 15  | `POST`      | `/eliza-agent/:agentId/message` | Send message to specified agent |
| 16  | `GET`       | `/persona-engine/average/:group` | Get average metrics for persona group |

---

## ❗ All errors return `502` except for user not found (404 on #5)

---

## 1. `GET /ping`

**Description:** Basic server health check.

**Request:** None  
**Sample Response:**

```json
{
  "message": "pong"
}
```

---

## 2. `GET /persona-engine/update/:address`

**Description:** Perform a real-time analysis of a given wallet address (ignores cache).

**Path Params:**

- `address`: Ethereum wallet address

**Sample Response:** _(omitted here for brevity; same as original, just translated fields)_

---

## 3. `GET /persona-engine/wallet/:address`

**Description:** Retrieve cached analysis data for a given wallet address.

_(Response structure same as #2)_

---

## 4. `GET /persona-engine/category/:group?[limit=3]&[address=wallet_address]`

**Description:** Retrieve the most interacted contracts by persona group.

**Path Param:**

- `group`: A combination of two persona types (e.g., `Whale_Diamond`)

**Query Params:**

- `limit`: Optional. Default: 3. Return top `n` contracts.
- `address`: Optional. If provided, excludes contracts this wallet has already interacted with.

_(Response fields like `name`, `description`, `frequency` all translated.)_

---

## 5. `GET /user/:address`

**Description:** Get user details using their wallet address.

**Path Param:**

- `address`: Wallet address

**Sample Response:**

```json
{
  "success": true,
  "data": {
    "_id": "...",
    "address": "0xabc123...",
    "email": "daniel@example.com",
    "telegram": "@daniel_eth",
    "createdAt": "2024-04-12T...",
    "__v": 0
  }
}
```

---

## 6. `POST /user/signup`

**Description:** Register a new user using only the wallet address.

**Request Body:**

```json
{
  "address": "0xabc..."
}
```

**Sample Response:** _(same structure, fields translated)_

---

## 7. `POST /user/email/:address`

**Description:** Register or update an email for the specified address.

**Path Param:**  
- `address`: Wallet address

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

**Sample Response:** _(corrected title field - seems the sample had Telegram’s message instead)_

---

## 8. `POST /user/telegram/:address`

**Description:** Register or update Telegram handle for the specified wallet.

**Path Param:**  
- `address`: Wallet address

**Request Body:**

```json
{
  "telegram": "@username"
}
```

_(Response structure same as above.)_

---

## 9. `POST /persona-engine/logs/:address`

**Description:** Returns historical changes of persona scores for the wallet.

**Sample Response:** _(Translated fields like `explorer_score`, `created_at`, etc.)_

---

## 10. `GET /tx-agent/agent`

**Description:** Returns the currently configured Agent address.

**Sample Response:**

```json
{
  "success": true,
  "agent": "0x1234...abcd"
}
```

---

## 11. `POST /tx-agent/createAccount`

**Description:** Create proxy account for the user’s wallet.

**Request:**

```json
{
  "address": "0xUserWallet..."
}
```

---

## 12. `POST /tx-agent/executeTransaction`

**Description:** Execute a transaction using stored DApp ABI.

_(Request and response fully translated; `method`, `params`, `txHash` etc.)_

---

## 13. `GET /tx-agent/getRules/:address`

**Description:** Fetch all active rules for a user.

_(Includes execution settings like interval, timeout, executed count.)_

---

## 14. `GET /eliza-agent/agents`

**Description:** Return all registered Eliza agent IDs.

---

## 15. `POST /eliza-agent/:agentId/message`

**Description:** Send a message to a specific agent.

**Request:**

```json
{
  "roomId": "0xb1Dc...",
  "text": "Explain the Aave protocol",
  "source": "next"
}
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "user": "Eliza",
      "text": "Aave is a decentralized finance protocol that allows users to lend and borrow crypto assets...",
      "action": "NONE"
    }
  ]
}
```

---

## 16. `GET /persona-engine/average/:group`

**Description:** Return average metrics for a given persona group combination.

**Path Param:**

- `group`: Two-persona combination (e.g., `Explorer_Whale`)

_(Response includes average values for activity indicators across all users in that group.)_

