module.exports = [
"[project]/Downloads/travel-booking-platform/lib/local-db.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// IndexedDB setup and CRUD operations for all tables
__turbopack_context__.s([
    "TABLES",
    ()=>TABLES,
    "agentStatusDB",
    ()=>agentStatusDB,
    "auditLogsDB",
    ()=>auditLogsDB,
    "bookingsDB",
    ()=>bookingsDB,
    "disputesDB",
    ()=>disputesDB,
    "groupBookingsDB",
    ()=>groupBookingsDB,
    "initDB",
    ()=>initDB,
    "kycDB",
    ()=>kycDB,
    "loginHistoryDB",
    ()=>loginHistoryDB,
    "notificationsDB",
    ()=>notificationsDB,
    "promotionalBannersDB",
    ()=>promotionalBannersDB,
    "refundsDB",
    ()=>refundsDB,
    "scheduledReportsDB",
    ()=>scheduledReportsDB,
    "ticketLocksDB",
    ()=>ticketLocksDB,
    "transactionsDB",
    ()=>transactionsDB,
    "walletDepositRequestsDB",
    ()=>walletDepositRequestsDB
]);
const DB_NAME = "TravelBookingDB";
const DB_VERSION = 4;
const TABLES = {
    BOOKINGS: "bookings",
    TRANSACTIONS: "transactions",
    REFUNDS: "refunds",
    DISPUTES: "disputes",
    KYC_DOCUMENTS: "kyc_documents",
    NOTIFICATIONS: "notifications",
    LOGIN_HISTORY: "login_history",
    AUDIT_LOGS: "audit_logs",
    SCHEDULED_REPORTS: "scheduled_reports",
    PROMOTIONAL_BANNERS: "promotional_banners",
    WALLET_DEPOSIT_REQUESTS: "wallet_deposit_requests",
    AGENT_STATUS: "agent_status",
    GROUP_BOOKINGS: "group_bookings",
    TICKET_LOCKS: "ticket_locks"
};
// Database initialization
let dbInstance = null;
async function initDB() {
    if (dbInstance) return dbInstance;
    return new Promise((resolve, reject)=>{
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onerror = ()=>reject(request.error);
        request.onsuccess = ()=>{
            dbInstance = request.result;
            resolve(dbInstance);
        };
        request.onupgradeneeded = (event)=>{
            const db = event.target.result;
            // Create object stores
            if (!db.objectStoreNames.contains(TABLES.BOOKINGS)) {
                const bookingsStore = db.createObjectStore(TABLES.BOOKINGS, {
                    keyPath: "id"
                });
                bookingsStore.createIndex("bookingId", "bookingId", {
                    unique: true
                });
                bookingsStore.createIndex("agentId", "agentId");
                bookingsStore.createIndex("status", "status");
                bookingsStore.createIndex("date", "date");
            }
            if (!db.objectStoreNames.contains(TABLES.TRANSACTIONS)) {
                const txStore = db.createObjectStore(TABLES.TRANSACTIONS, {
                    keyPath: "id"
                });
                txStore.createIndex("date", "date");
                txStore.createIndex("type", "type");
                txStore.createIndex("status", "status");
                txStore.createIndex("bookingId", "bookingId");
            }
            if (!db.objectStoreNames.contains(TABLES.REFUNDS)) {
                const refundsStore = db.createObjectStore(TABLES.REFUNDS, {
                    keyPath: "id"
                });
                refundsStore.createIndex("refundId", "refundId", {
                    unique: true
                });
                refundsStore.createIndex("bookingId", "bookingId");
                refundsStore.createIndex("status", "status");
            }
            if (!db.objectStoreNames.contains(TABLES.DISPUTES)) {
                const disputesStore = db.createObjectStore(TABLES.DISPUTES, {
                    keyPath: "id"
                });
                disputesStore.createIndex("disputeId", "disputeId", {
                    unique: true
                });
                disputesStore.createIndex("status", "status");
            }
            if (!db.objectStoreNames.contains(TABLES.KYC_DOCUMENTS)) {
                const kycStore = db.createObjectStore(TABLES.KYC_DOCUMENTS, {
                    keyPath: "id"
                });
                kycStore.createIndex("userId", "userId");
                kycStore.createIndex("status", "status");
            }
            if (!db.objectStoreNames.contains(TABLES.NOTIFICATIONS)) {
                const notifStore = db.createObjectStore(TABLES.NOTIFICATIONS, {
                    keyPath: "id"
                });
                notifStore.createIndex("userId", "userId");
                notifStore.createIndex("read", "read");
                notifStore.createIndex("createdAt", "createdAt");
            }
            if (!db.objectStoreNames.contains(TABLES.LOGIN_HISTORY)) {
                const loginStore = db.createObjectStore(TABLES.LOGIN_HISTORY, {
                    keyPath: "id"
                });
                loginStore.createIndex("userId", "userId");
                loginStore.createIndex("loginTime", "loginTime");
            }
            if (!db.objectStoreNames.contains(TABLES.AUDIT_LOGS)) {
                const auditStore = db.createObjectStore(TABLES.AUDIT_LOGS, {
                    keyPath: "id"
                });
                auditStore.createIndex("timestamp", "timestamp");
                auditStore.createIndex("userId", "userId");
                auditStore.createIndex("module", "module");
                auditStore.createIndex("action", "action");
            }
            if (!db.objectStoreNames.contains(TABLES.SCHEDULED_REPORTS)) {
                const reportsStore = db.createObjectStore(TABLES.SCHEDULED_REPORTS, {
                    keyPath: "id"
                });
                reportsStore.createIndex("reportId", "reportId", {
                    unique: true
                });
                reportsStore.createIndex("status", "status");
            }
            if (!db.objectStoreNames.contains(TABLES.PROMOTIONAL_BANNERS)) {
                const bannersStore = db.createObjectStore(TABLES.PROMOTIONAL_BANNERS, {
                    keyPath: "id"
                });
                bannersStore.createIndex("active", "active");
            }
            if (!db.objectStoreNames.contains(TABLES.WALLET_DEPOSIT_REQUESTS)) {
                const depositStore = db.createObjectStore(TABLES.WALLET_DEPOSIT_REQUESTS, {
                    keyPath: "id"
                });
                depositStore.createIndex("requestId", "requestId", {
                    unique: true
                });
                depositStore.createIndex("agentId", "agentId");
                depositStore.createIndex("status", "status");
            }
            if (!db.objectStoreNames.contains(TABLES.AGENT_STATUS)) {
                const statusStore = db.createObjectStore(TABLES.AGENT_STATUS, {
                    keyPath: "id"
                });
                statusStore.createIndex("agentId", "agentId", {
                    unique: true
                });
                statusStore.createIndex("status", "status");
            }
            if (!db.objectStoreNames.contains(TABLES.GROUP_BOOKINGS)) {
                const groupStore = db.createObjectStore(TABLES.GROUP_BOOKINGS, {
                    keyPath: "id"
                });
                groupStore.createIndex("reference", "reference", {
                    unique: true
                });
                groupStore.createIndex("status", "status");
                groupStore.createIndex("createdAt", "createdAt");
            }
            if (!db.objectStoreNames.contains(TABLES.TICKET_LOCKS)) {
                const locksStore = db.createObjectStore(TABLES.TICKET_LOCKS, {
                    keyPath: "id"
                });
                locksStore.createIndex("lockId", "lockId", {
                    unique: true
                });
                locksStore.createIndex("agentId", "agentId");
                locksStore.createIndex("status", "status");
                locksStore.createIndex("expiresAt", "expiresAt");
                locksStore.createIndex("flightId", "flightId");
            }
        };
    });
}
// Helper to generate IDs
function generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
function generateBookingId(type) {
    const prefix = type === "FLIGHT" ? "FL" : "HT";
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `${prefix}-${date}-${random}`;
}
function generatePNR() {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
}
// Generic CRUD functions
async function create(table, data) {
    const db = await initDB();
    // Check if object store exists
    if (!db.objectStoreNames.contains(table)) {
        throw new Error(`Object store "${table}" does not exist. Please upgrade the database.`);
    }
    const tx = db.transaction(table, "readwrite");
    const store = tx.objectStore(table);
    const newData = {
        ...data,
        id: generateId()
    };
    return new Promise((resolve, reject)=>{
        const request = store.add(newData);
        request.onsuccess = ()=>resolve(newData);
        request.onerror = ()=>reject(request.error);
    });
}
async function read(table, id) {
    const db = await initDB();
    // Check if object store exists
    if (!db.objectStoreNames.contains(table)) {
        console.warn(`Object store "${table}" does not exist. Returning undefined.`);
        return undefined;
    }
    const tx = db.transaction(table, "readonly");
    const store = tx.objectStore(table);
    return new Promise((resolve, reject)=>{
        const request = store.get(id);
        request.onsuccess = ()=>resolve(request.result);
        request.onerror = ()=>reject(request.error);
    });
}
async function readAll(table) {
    const db = await initDB();
    // Check if object store exists
    if (!db.objectStoreNames.contains(table)) {
        console.warn(`Object store "${table}" does not exist. Returning empty array.`);
        return [];
    }
    const tx = db.transaction(table, "readonly");
    const store = tx.objectStore(table);
    return new Promise((resolve, reject)=>{
        const request = store.getAll();
        request.onsuccess = ()=>resolve(request.result || []);
        request.onerror = ()=>reject(request.error);
    });
}
async function update(table, id, data) {
    const db = await initDB();
    // Check if object store exists
    if (!db.objectStoreNames.contains(table)) {
        throw new Error(`Object store "${table}" does not exist. Please upgrade the database.`);
    }
    const tx = db.transaction(table, "readwrite");
    const store = tx.objectStore(table);
    return new Promise((resolve, reject)=>{
        const getRequest = store.get(id);
        getRequest.onsuccess = ()=>{
            const existing = getRequest.result;
            if (!existing) {
                reject(new Error("Record not found"));
                return;
            }
            const updated = {
                ...existing,
                ...data,
                id
            };
            const putRequest = store.put(updated);
            putRequest.onsuccess = ()=>resolve(updated);
            putRequest.onerror = ()=>reject(putRequest.error);
        };
        getRequest.onerror = ()=>reject(getRequest.error);
    });
}
async function remove(table, id) {
    const db = await initDB();
    // Check if object store exists
    if (!db.objectStoreNames.contains(table)) {
        throw new Error(`Object store "${table}" does not exist. Please upgrade the database.`);
    }
    const tx = db.transaction(table, "readwrite");
    const store = tx.objectStore(table);
    return new Promise((resolve, reject)=>{
        const request = store.delete(id);
        request.onsuccess = ()=>resolve();
        request.onerror = ()=>reject(request.error);
    });
}
async function search(table, query) {
    const all = await readAll(table);
    return all.filter(query);
}
async function filter(table, filters) {
    const all = await readAll(table);
    return all.filter((item)=>{
        return Object.entries(filters).every(([key, value])=>{
            if (value === undefined || value === null || value === "all") return true;
            return item[key] === value;
        });
    });
}
const bookingsDB = {
    create: async (data)=>{
        const now = new Date().toISOString();
        const bookingId = generateBookingId(data.type);
        const pnr = generatePNR();
        return create(TABLES.BOOKINGS, {
            ...data,
            bookingId,
            pnr,
            createdAt: now,
            updatedAt: now
        });
    },
    read: (id)=>read(TABLES.BOOKINGS, id),
    readAll: ()=>readAll(TABLES.BOOKINGS),
    update: (id, data)=>update(TABLES.BOOKINGS, id, {
            ...data,
            updatedAt: new Date().toISOString()
        }),
    delete: (id)=>remove(TABLES.BOOKINGS, id),
    search: (query)=>search(TABLES.BOOKINGS, query),
    filter: (filters)=>filter(TABLES.BOOKINGS, filters)
};
const transactionsDB = {
    create: async (data)=>{
        return create(TABLES.TRANSACTIONS, {
            ...data,
            createdAt: new Date().toISOString()
        });
    },
    read: (id)=>read(TABLES.TRANSACTIONS, id),
    readAll: ()=>readAll(TABLES.TRANSACTIONS),
    update: (id, data)=>update(TABLES.TRANSACTIONS, id, data),
    delete: (id)=>remove(TABLES.TRANSACTIONS, id),
    search: (query)=>search(TABLES.TRANSACTIONS, query),
    filter: (filters)=>filter(TABLES.TRANSACTIONS, filters)
};
const refundsDB = {
    create: async (data)=>{
        const now = new Date().toISOString();
        const refundId = `REF-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
        return create(TABLES.REFUNDS, {
            ...data,
            refundId,
            status: "Initiated",
            timeline: [
                {
                    stage: "Initiated",
                    date: now,
                    status: "completed"
                }
            ],
            createdAt: now,
            updatedAt: now
        });
    },
    read: (id)=>read(TABLES.REFUNDS, id),
    readAll: ()=>readAll(TABLES.REFUNDS),
    update: (id, data)=>update(TABLES.REFUNDS, id, {
            ...data,
            updatedAt: new Date().toISOString()
        }),
    delete: (id)=>remove(TABLES.REFUNDS, id),
    search: (query)=>search(TABLES.REFUNDS, query),
    filter: (filters)=>filter(TABLES.REFUNDS, filters)
};
const disputesDB = {
    create: async (data)=>{
        const now = new Date().toISOString();
        const disputeId = `DSP-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 3)}`;
        return create(TABLES.DISPUTES, {
            ...data,
            disputeId,
            status: "Raised",
            messages: [],
            createdAt: now,
            updatedAt: now
        });
    },
    read: (id)=>read(TABLES.DISPUTES, id),
    readAll: ()=>readAll(TABLES.DISPUTES),
    update: (id, data)=>update(TABLES.DISPUTES, id, {
            ...data,
            updatedAt: new Date().toISOString()
        }),
    delete: (id)=>remove(TABLES.DISPUTES, id),
    search: (query)=>search(TABLES.DISPUTES, query),
    filter: (filters)=>filter(TABLES.DISPUTES, filters)
};
const kycDB = {
    create: async (data)=>{
        const now = new Date().toISOString();
        return create(TABLES.KYC_DOCUMENTS, {
            ...data,
            status: "Pending",
            createdAt: now,
            updatedAt: now
        });
    },
    read: (id)=>read(TABLES.KYC_DOCUMENTS, id),
    readAll: ()=>readAll(TABLES.KYC_DOCUMENTS),
    update: (id, data)=>update(TABLES.KYC_DOCUMENTS, id, {
            ...data,
            updatedAt: new Date().toISOString()
        }),
    delete: (id)=>remove(TABLES.KYC_DOCUMENTS, id),
    search: (query)=>search(TABLES.KYC_DOCUMENTS, query),
    filter: (filters)=>filter(TABLES.KYC_DOCUMENTS, filters)
};
const notificationsDB = {
    create: async (data)=>{
        return create(TABLES.NOTIFICATIONS, {
            ...data,
            read: false,
            createdAt: new Date().toISOString()
        });
    },
    read: (id)=>read(TABLES.NOTIFICATIONS, id),
    readAll: ()=>readAll(TABLES.NOTIFICATIONS),
    update: (id, data)=>update(TABLES.NOTIFICATIONS, id, data),
    delete: (id)=>remove(TABLES.NOTIFICATIONS, id),
    search: (query)=>search(TABLES.NOTIFICATIONS, query),
    filter: (filters)=>filter(TABLES.NOTIFICATIONS, filters)
};
const loginHistoryDB = {
    create: async (data)=>{
        return create(TABLES.LOGIN_HISTORY, data);
    },
    read: (id)=>read(TABLES.LOGIN_HISTORY, id),
    readAll: ()=>readAll(TABLES.LOGIN_HISTORY),
    update: (id, data)=>update(TABLES.LOGIN_HISTORY, id, data),
    delete: (id)=>remove(TABLES.LOGIN_HISTORY, id),
    search: (query)=>search(TABLES.LOGIN_HISTORY, query),
    filter: (filters)=>filter(TABLES.LOGIN_HISTORY, filters)
};
const auditLogsDB = {
    create: async (data)=>{
        return create(TABLES.AUDIT_LOGS, {
            ...data,
            timestamp: new Date().toISOString()
        });
    },
    read: (id)=>read(TABLES.AUDIT_LOGS, id),
    readAll: ()=>readAll(TABLES.AUDIT_LOGS),
    update: (id, data)=>update(TABLES.AUDIT_LOGS, id, data),
    delete: (id)=>remove(TABLES.AUDIT_LOGS, id),
    search: (query)=>search(TABLES.AUDIT_LOGS, query),
    filter: (filters)=>filter(TABLES.AUDIT_LOGS, filters)
};
const scheduledReportsDB = {
    create: async (data)=>{
        const reportId = `RPT-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
        return create(TABLES.SCHEDULED_REPORTS, {
            ...data,
            reportId,
            status: "Scheduled",
            createdAt: new Date().toISOString()
        });
    },
    read: (id)=>read(TABLES.SCHEDULED_REPORTS, id),
    readAll: ()=>readAll(TABLES.SCHEDULED_REPORTS),
    update: (id, data)=>update(TABLES.SCHEDULED_REPORTS, id, data),
    delete: (id)=>remove(TABLES.SCHEDULED_REPORTS, id),
    search: (query)=>search(TABLES.SCHEDULED_REPORTS, query),
    filter: (filters)=>filter(TABLES.SCHEDULED_REPORTS, filters)
};
const promotionalBannersDB = {
    create: async (data)=>{
        const now = new Date().toISOString();
        return create(TABLES.PROMOTIONAL_BANNERS, {
            ...data,
            clicks: 0,
            createdAt: now,
            updatedAt: now
        });
    },
    read: (id)=>read(TABLES.PROMOTIONAL_BANNERS, id),
    readAll: ()=>readAll(TABLES.PROMOTIONAL_BANNERS),
    update: (id, data)=>update(TABLES.PROMOTIONAL_BANNERS, id, {
            ...data,
            updatedAt: new Date().toISOString()
        }),
    delete: (id)=>remove(TABLES.PROMOTIONAL_BANNERS, id),
    search: (query)=>search(TABLES.PROMOTIONAL_BANNERS, query),
    filter: (filters)=>filter(TABLES.PROMOTIONAL_BANNERS, filters)
};
const walletDepositRequestsDB = {
    create: async (data)=>{
        const now = new Date().toISOString();
        const requestId = `DEP-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
        return create(TABLES.WALLET_DEPOSIT_REQUESTS, {
            ...data,
            requestId,
            status: "Pending",
            createdAt: now,
            updatedAt: now
        });
    },
    read: (id)=>read(TABLES.WALLET_DEPOSIT_REQUESTS, id),
    readAll: ()=>readAll(TABLES.WALLET_DEPOSIT_REQUESTS),
    update: (id, data)=>update(TABLES.WALLET_DEPOSIT_REQUESTS, id, {
            ...data,
            updatedAt: new Date().toISOString()
        }),
    delete: (id)=>remove(TABLES.WALLET_DEPOSIT_REQUESTS, id),
    search: (query)=>search(TABLES.WALLET_DEPOSIT_REQUESTS, query),
    filter: (filters)=>filter(TABLES.WALLET_DEPOSIT_REQUESTS, filters)
};
const agentStatusDB = {
    create: async (data)=>{
        const now = new Date().toISOString();
        return create(TABLES.AGENT_STATUS, {
            ...data,
            status: data.status || "Active",
            createdAt: now,
            updatedAt: now
        });
    },
    read: (id)=>read(TABLES.AGENT_STATUS, id),
    readByAgentId: async (agentId)=>{
        const all = await readAll(TABLES.AGENT_STATUS);
        return all.find((s)=>s.agentId === agentId);
    },
    readAll: ()=>readAll(TABLES.AGENT_STATUS),
    update: (id, data)=>update(TABLES.AGENT_STATUS, id, {
            ...data,
            updatedAt: new Date().toISOString()
        }),
    updateByAgentId: async (agentId, data)=>{
        const existing = await agentStatusDB.readByAgentId(agentId);
        if (existing) {
            return update(TABLES.AGENT_STATUS, existing.id, {
                ...data,
                updatedAt: new Date().toISOString()
            });
        }
        // Create if doesn't exist
        return agentStatusDB.create({
            agentId,
            ...data
        });
    },
    delete: (id)=>remove(TABLES.AGENT_STATUS, id),
    search: (query)=>search(TABLES.AGENT_STATUS, query),
    filter: (filters)=>filter(TABLES.AGENT_STATUS, filters)
};
const groupBookingsDB = {
    create: async (data)=>{
        const now = new Date().toISOString();
        const reference = `GRP-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
        return create(TABLES.GROUP_BOOKINGS, {
            ...data,
            reference,
            createdAt: now,
            updatedAt: now
        });
    },
    read: (id)=>read(TABLES.GROUP_BOOKINGS, id),
    readAll: ()=>readAll(TABLES.GROUP_BOOKINGS),
    update: (id, data)=>update(TABLES.GROUP_BOOKINGS, id, {
            ...data,
            updatedAt: new Date().toISOString()
        }),
    delete: (id)=>remove(TABLES.GROUP_BOOKINGS, id),
    search: (query)=>search(TABLES.GROUP_BOOKINGS, query),
    filter: (filters)=>filter(TABLES.GROUP_BOOKINGS, filters)
};
const ticketLocksDB = {
    create: async (data)=>{
        const now = new Date().toISOString();
        const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString() // 48 hours from now
        ;
        const lockId = `LOCK-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
        // Calculate defaults for quantity and pricePerTicket if not provided
        const quantity = data.quantity || 1;
        const pricePerTicket = data.pricePerTicket || data.lockedPrice / quantity;
        return create(TABLES.TICKET_LOCKS, {
            ...data,
            quantity,
            pricePerTicket,
            lockId,
            lockedAt: now,
            expiresAt,
            status: "LOCKED",
            createdAt: now,
            updatedAt: now
        });
    },
    read: (id)=>read(TABLES.TICKET_LOCKS, id),
    readAll: ()=>readAll(TABLES.TICKET_LOCKS),
    update: (id, data)=>update(TABLES.TICKET_LOCKS, id, {
            ...data,
            updatedAt: new Date().toISOString()
        }),
    delete: (id)=>remove(TABLES.TICKET_LOCKS, id),
    search: (query)=>search(TABLES.TICKET_LOCKS, query),
    filter: (filters)=>filter(TABLES.TICKET_LOCKS, filters),
    readByAgentId: async (agentId)=>{
        const all = await readAll(TABLES.TICKET_LOCKS);
        return all.filter((lock)=>lock.agentId === agentId && lock.status === "LOCKED");
    },
    readActive: async ()=>{
        const all = await readAll(TABLES.TICKET_LOCKS);
        const now = new Date().toISOString();
        return all.filter((lock)=>lock.status === "LOCKED" && lock.expiresAt > now);
    }
};
}),
"[project]/Downloads/travel-booking-platform/components/ui/table.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Table",
    ()=>Table,
    "TableBody",
    ()=>TableBody,
    "TableCaption",
    ()=>TableCaption,
    "TableCell",
    ()=>TableCell,
    "TableFooter",
    ()=>TableFooter,
    "TableHead",
    ()=>TableHead,
    "TableHeader",
    ()=>TableHeader,
    "TableRow",
    ()=>TableRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
function Table({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "table-container",
        className: "relative w-full overflow-x-auto",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            "data-slot": "table",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('w-full caption-bottom text-sm', className),
            ...props
        }, void 0, false, {
            fileName: "[project]/Downloads/travel-booking-platform/components/ui/table.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/table.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
function TableHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
        "data-slot": "table-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('[&_tr]:border-b', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/table.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
function TableBody({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
        "data-slot": "table-body",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('[&_tr:last-child]:border-0', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/table.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
function TableFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tfoot", {
        "data-slot": "table-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('bg-muted/50 border-t font-medium [&>tr]:last:border-b-0', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/table.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
function TableRow({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
        "data-slot": "table-row",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/table.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
function TableHead({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
        "data-slot": "table-head",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/table.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
function TableCell({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
        "data-slot": "table-cell",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/table.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
function TableCaption({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("caption", {
        "data-slot": "table-caption",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground mt-4 text-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/table.tsx",
        lineNumber: 99,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/Downloads/travel-booking-platform/components/ui/badge.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])('inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden', {
    variants: {
        variant: {
            default: 'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
            secondary: 'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
            destructive: 'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});
function Badge({ className, variant, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Slot"] : 'span';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "badge",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/badge.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/Downloads/travel-booking-platform/components/ui/label.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/@radix-ui/react-label/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function Label({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/label.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/Downloads/travel-booking-platform/lib/audit-utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Audit logging utilities
__turbopack_context__.s([
    "audit",
    ()=>audit,
    "logAction",
    ()=>logAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$local$2d$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/lib/local-db.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/lib/store.ts [app-ssr] (ecmascript)");
;
;
// Get mock IP address (in real app, this would come from request)
function getMockIPAddress() {
    return `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}
async function logAction(action, module, recordId, previousValue, newValue) {
    try {
        const store = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppStore"].getState();
        const userId = store.currentUser.id;
        const role = store.currentUser.role;
        await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$local$2d$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auditLogsDB"].create({
            userId,
            role,
            action,
            module,
            recordId,
            previousValue,
            newValue,
            ipAddress: getMockIPAddress()
        });
    } catch (error) {
        console.error("Failed to log action:", error);
    }
}
const audit = {
    create: (module, recordId, newValue)=>logAction("Create", module, recordId, undefined, newValue),
    update: (module, recordId, previousValue, newValue)=>logAction("Update", module, recordId, previousValue, newValue),
    delete: (module, recordId, previousValue)=>logAction("Delete", module, recordId, previousValue, undefined),
    approve: (module, recordId, newValue)=>logAction("Approve", module, recordId, undefined, newValue),
    reject: (module, recordId, newValue)=>logAction("Reject", module, recordId, undefined, newValue),
    reveal: (module, recordId)=>logAction("Reveal", module, recordId, undefined, undefined)
};
}),
"[project]/Downloads/travel-booking-platform/lib/policy-utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Policy Compliance Utility
// Checks flight bookings against travel policies
__turbopack_context__.s([
    "checkFlightPolicyCompliance",
    ()=>checkFlightPolicyCompliance,
    "checkHotelPolicyCompliance",
    ()=>checkHotelPolicyCompliance,
    "generateBookingId",
    ()=>generateBookingId,
    "generateHotelBookingId",
    ()=>generateHotelBookingId,
    "generateHotelVoucherNumber",
    ()=>generateHotelVoucherNumber,
    "generatePNR",
    ()=>generatePNR,
    "validateGSTIN",
    ()=>validateGSTIN,
    "validateMobileNumber",
    ()=>validateMobileNumber,
    "validateName",
    ()=>validateName
]);
// Default policy values (can be loaded from user's policy)
const DEFAULT_POLICY = {
    maxDomesticPrice: 15000,
    maxInternationalPrice: 50000,
    allowedCabinClass: "Economy",
    advanceBookingDays: 0
};
function checkFlightPolicyCompliance(flightPrice, cabinClass, departureDate, isInternational = false, userPolicy) {
    const policy = {
        ...DEFAULT_POLICY,
        ...userPolicy
    };
    const violations = [];
    let requiresApproval = false;
    // Check price limits
    const maxPrice = isInternational ? policy.maxInternationalPrice : policy.maxDomesticPrice;
    if (flightPrice > maxPrice) {
        violations.push(`Flight price (₹${flightPrice}) exceeds maximum allowed price (₹${maxPrice}) for ${isInternational ? "international" : "domestic"} flights`);
        requiresApproval = true;
    }
    // Check cabin class
    if (policy.allowedCabinClass !== "All") {
        const cabinClassLower = cabinClass.toLowerCase();
        const allowedClassLower = policy.allowedCabinClass.toLowerCase();
        if (cabinClassLower === "business" && allowedClassLower !== "business") {
            violations.push(`Business class not allowed. Policy allows: ${policy.allowedCabinClass} only`);
            requiresApproval = true;
        } else if (cabinClassLower === "premium" && allowedClassLower === "economy") {
            violations.push(`Premium Economy not allowed. Policy allows: Economy only`);
            requiresApproval = true;
        }
    }
    // Check advance booking requirement
    if (policy.advanceBookingDays > 0) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const departure = new Date(departureDate);
        departure.setHours(0, 0, 0, 0);
        const daysDifference = Math.floor((departure.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        if (daysDifference < policy.advanceBookingDays) {
            violations.push(`Booking must be made at least ${policy.advanceBookingDays} day${policy.advanceBookingDays > 1 ? "s" : ""} in advance. Current booking is ${daysDifference} day${daysDifference !== 1 ? "s" : ""} before departure`);
            requiresApproval = true;
        }
    }
    return {
        compliant: violations.length === 0,
        violations,
        requiresApproval
    };
}
function generateBookingId() {
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0].replace(/-/g, "");
    const random = Math.floor(1000 + Math.random() * 9000) // 4-digit random number
    ;
    return `FL-${dateStr}-${random}`;
}
function generatePNR() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let pnr = "";
    for(let i = 0; i < 6; i++){
        pnr += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pnr;
}
const DEFAULT_HOTEL_POLICY = {
    maxRatePerNightMetro: 15000,
    maxRatePerNightOther: 10000,
    minStarRating: undefined,
    requireAdvanceBooking: undefined
};
// Metro cities list
const METRO_CITIES = [
    "mumbai",
    "delhi",
    "bangalore",
    "chennai",
    "kolkata",
    "hyderabad",
    "pune",
    "ahmedabad"
];
function checkHotelPolicyCompliance(pricePerNight, location, starRating, checkInDate, userPolicy) {
    const policy = {
        ...DEFAULT_HOTEL_POLICY,
        ...userPolicy
    };
    const violations = [];
    let requiresApproval = false;
    // Determine if location is metro or other
    const locationLower = location.toLowerCase();
    const isMetro = METRO_CITIES.some((city)=>locationLower.includes(city));
    const maxRate = isMetro ? policy.maxRatePerNightMetro : policy.maxRatePerNightOther;
    // Check rate limits
    if (pricePerNight > maxRate) {
        violations.push(`Hotel rate (₹${pricePerNight}/night) exceeds maximum allowed rate (₹${maxRate}/night) for ${isMetro ? "metro" : "non-metro"} cities`);
        requiresApproval = true;
    }
    // Check minimum star rating
    if (policy.minStarRating && starRating && starRating < policy.minStarRating) {
        violations.push(`Hotel star rating (${starRating}) is below minimum required rating (${policy.minStarRating})`);
        requiresApproval = true;
    }
    // Check advance booking requirement
    if (policy.requireAdvanceBooking && checkInDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const checkIn = new Date(checkInDate);
        checkIn.setHours(0, 0, 0, 0);
        const daysDifference = Math.floor((checkIn.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        if (daysDifference < policy.requireAdvanceBooking) {
            violations.push(`Booking must be made at least ${policy.requireAdvanceBooking} day${policy.requireAdvanceBooking > 1 ? "s" : ""} in advance. Current booking is ${daysDifference} day${daysDifference !== 1 ? "s" : ""} before check-in`);
            requiresApproval = true;
        }
    }
    return {
        compliant: violations.length === 0,
        violations,
        requiresApproval
    };
}
function generateHotelBookingId() {
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0].replace(/-/g, "");
    const random = Math.floor(1000 + Math.random() * 9000) // 4-digit random number
    ;
    return `HT-${dateStr}-${random}`;
}
function generateHotelVoucherNumber() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let voucher = "VCH-";
    for(let i = 0; i < 8; i++){
        voucher += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return voucher;
}
function validateGSTIN(gstin) {
    // GSTIN format: 15 characters - 2 digits (state code) + 10 chars (PAN) + 1 char (entity number) + 1 char (Z) + 1 char (check digit)
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstinRegex.test(gstin.toUpperCase());
}
function validateMobileNumber(mobile) {
    const mobileDigits = mobile.replace(/\D/g, "");
    return mobileDigits.length === 10 && /^[6-9]/.test(mobileDigits);
}
function validateName(name) {
    return /^[a-zA-Z\s]+$/.test(name) && name.trim().length >= 2;
}
}),
"[project]/Downloads/travel-booking-platform/lib/wallet-utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Wallet utility functions for balance management, validations, and operations
__turbopack_context__.s([
    "MAX_ADD_FUNDS",
    ()=>MAX_ADD_FUNDS,
    "MIN_ADD_FUNDS",
    ()=>MIN_ADD_FUNDS,
    "calculateBalanceFromTransactions",
    ()=>calculateBalanceFromTransactions,
    "createTransaction",
    ()=>createTransaction,
    "formatTimeAgo",
    ()=>formatTimeAgo,
    "getBudgetAlertStatus",
    ()=>getBudgetAlertStatus,
    "getBudgetUsage",
    ()=>getBudgetUsage,
    "getLastUpdatedTimestamp",
    ()=>getLastUpdatedTimestamp,
    "getMonthlyBudget",
    ()=>getMonthlyBudget,
    "getMonthlySpend",
    ()=>getMonthlySpend,
    "getWalletBalance",
    ()=>getWalletBalance,
    "hasSufficientBalance",
    ()=>hasSufficientBalance,
    "maskEmail",
    ()=>maskEmail,
    "maskPhone",
    ()=>maskPhone,
    "setLastUpdatedTimestamp",
    ()=>setLastUpdatedTimestamp,
    "setMonthlyBudget",
    ()=>setMonthlyBudget,
    "setWalletBalance",
    ()=>setWalletBalance,
    "validateAddFundsAmount",
    ()=>validateAddFundsAmount
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$local$2d$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/lib/local-db.ts [app-ssr] (ecmascript)");
;
const WALLET_BALANCE_KEY = "wallet_balance";
const MONTHLY_BUDGET_KEY = "monthly_budget";
const MIN_ADD_FUNDS = 100;
const MAX_ADD_FUNDS = 500000;
function getWalletBalance() {
    if ("TURBOPACK compile-time truthy", 1) return 0;
    //TURBOPACK unreachable
    ;
    const stored = undefined;
}
function setWalletBalance(balance) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function getLastUpdatedTimestamp() {
    if ("TURBOPACK compile-time truthy", 1) return new Date();
    //TURBOPACK unreachable
    ;
    const stored = undefined;
}
function setLastUpdatedTimestamp() {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
async function calculateBalanceFromTransactions() {
    const transactions = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$local$2d$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transactionsDB"].readAll();
    const completedTransactions = transactions.filter((tx)=>tx.status === "Completed");
    // Get the latest transaction with balanceAfter, or calculate from all transactions
    const sortedTransactions = completedTransactions.sort((a, b)=>new Date(b.date).getTime() - new Date(a.date).getTime());
    if (sortedTransactions.length > 0 && sortedTransactions[0].balanceAfter !== undefined) {
        return sortedTransactions[0].balanceAfter;
    }
    // Fallback: calculate from all transactions
    return completedTransactions.reduce((balance, tx)=>{
        if (tx.type === "CREDIT" || tx.type === "REFUND") {
            return balance + Math.abs(tx.amount);
        } else if (tx.type === "DEBIT") {
            return balance - Math.abs(tx.amount);
        }
        return balance;
    }, 0);
}
function validateAddFundsAmount(amount) {
    if (isNaN(amount) || amount <= 0) {
        return {
            valid: false,
            error: "Amount must be greater than 0"
        };
    }
    if (amount < MIN_ADD_FUNDS) {
        return {
            valid: false,
            error: `Minimum amount is ₹${MIN_ADD_FUNDS.toLocaleString("en-IN")}`
        };
    }
    if (amount > MAX_ADD_FUNDS) {
        return {
            valid: false,
            error: `Maximum amount is ₹${MAX_ADD_FUNDS.toLocaleString("en-IN")} per transaction`
        };
    }
    return {
        valid: true
    };
}
function hasSufficientBalance(requiredAmount) {
    const balance = getWalletBalance();
    return balance >= requiredAmount;
}
async function createTransaction(data) {
    const currentBalance = getWalletBalance();
    let newBalance = currentBalance;
    if (data.type === "CREDIT" || data.type === "REFUND") {
        newBalance = currentBalance + Math.abs(data.amount);
    } else if (data.type === "DEBIT") {
        newBalance = currentBalance - Math.abs(data.amount);
    }
    const transaction = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$local$2d$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transactionsDB"].create({
        ...data,
        balanceAfter: newBalance
    });
    // Update wallet balance
    setWalletBalance(newBalance);
    setLastUpdatedTimestamp();
    return transaction;
}
function getMonthlyBudget() {
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
    const stored = undefined;
}
function setMonthlyBudget(budget) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
async function getMonthlySpend() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const transactions = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$local$2d$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transactionsDB"].readAll();
    const monthlyDebits = transactions.filter((tx)=>{
        const txDate = new Date(tx.date);
        return tx.type === "DEBIT" && tx.status === "Completed" && txDate >= startOfMonth && txDate <= endOfMonth;
    });
    return monthlyDebits.reduce((sum, tx)=>sum + Math.abs(tx.amount), 0);
}
async function getBudgetUsage() {
    const budget = getMonthlyBudget();
    if (budget === null) {
        return {
            percentage: 0,
            spent: 0,
            budget: null
        };
    }
    const spent = await getMonthlySpend();
    const percentage = spent / budget * 100;
    return {
        percentage,
        spent,
        budget
    };
}
function getBudgetAlertStatus(percentage) {
    if (percentage >= 100) return "error";
    if (percentage >= 80) return "warning";
    return "none";
}
function maskPhone(phone) {
    if (!phone || phone.length < 4) return phone;
    return `**${phone.slice(-4)}`;
}
function maskEmail(email) {
    if (!email) return email;
    const [local, domain] = email.split("@");
    if (!domain) return email;
    if (local.length <= 2) return `${local[0]}**@${domain}`;
    return `${local.slice(0, 2)}**@${domain}`;
}
function formatTimeAgo(date) {
    const diff = Math.floor((new Date().getTime() - date.getTime()) / 1000 / 60);
    if (diff < 1) return "Just now";
    if (diff === 1) return "1 minute ago";
    if (diff < 60) return `${diff} minutes ago`;
    const hours = Math.floor(diff / 60);
    if (hours === 1) return "1 hour ago";
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
}
;
}),
"[project]/Downloads/travel-booking-platform/lib/pricing-utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Pricing utilities for calculating markups and applying pricing policies
__turbopack_context__.s([
    "calculateMarkup",
    ()=>calculateMarkup,
    "calculatePricingBreakdown",
    ()=>calculatePricingBreakdown,
    "getMarkupRules",
    ()=>getMarkupRules
]);
function getMarkupRules() {
    if ("TURBOPACK compile-time truthy", 1) return [];
    //TURBOPACK unreachable
    ;
    const stored = undefined;
}
function calculateMarkup(baseFare, product, route = "Domestic", fareType = "Regular", currency = "INR") {
    const rules = getMarkupRules();
    const today = new Date().toISOString().split('T')[0];
    // Find applicable rule
    const applicableRule = rules.find((rule)=>{
        const matchesProduct = rule.product === product;
        const matchesRoute = !rule.route || rule.route === route || route.includes(rule.route);
        const matchesFareType = !rule.fareType || rule.fareType === fareType || fareType.includes(rule.fareType);
        const matchesCurrency = !rule.currency || rule.currency === currency;
        const isActive = today >= rule.startDate && today <= rule.endDate;
        return matchesProduct && matchesRoute && matchesFareType && matchesCurrency && isActive;
    });
    if (applicableRule) {
        const markupPercent = parseFloat(applicableRule.markupPercent) || 0;
        const markup = baseFare * markupPercent / 100;
        return {
            markup,
            markupPercent
        };
    }
    // Default markup if no rule found (can be configured)
    const defaultMarkupPercent = 2.5;
    const markup = baseFare * defaultMarkupPercent / 100;
    return {
        markup,
        markupPercent: defaultMarkupPercent
    };
}
function calculatePricingBreakdown(baseFare, taxes, product, route = "Domestic", fareType = "Regular", currency = "INR", overrides) {
    const { markup: ruleMarkup, markupPercent: rulePercent } = calculateMarkup(baseFare, product, route, fareType, currency);
    const resolvedMarkupPercent = overrides?.markupPercent ?? rulePercent;
    const percentMarkup = baseFare * resolvedMarkupPercent / 100;
    const superAdminMarkup = overrides?.superAdminMarkup ?? 500;
    const agentMarkup = overrides?.applyMarkup === false ? 0 : overrides?.agentMarkup ?? 0;
    // Super admin markup is added directly to base fare (hidden from agents)
    // Agents see: baseFare (which includes super admin markup) + taxes + agent markup (shown as convenience fees)
    const adjustedBaseFare = baseFare + superAdminMarkup;
    // Only agent markup is shown to agents as "Convenience fees"
    // Super admin markup is not shown separately
    const markup = agentMarkup;
    const totalAmount = adjustedBaseFare + taxes + markup;
    return {
        baseFare: adjustedBaseFare,
        taxes,
        markup,
        totalAmount,
        markupPercent: resolvedMarkupPercent,
        superAdminMarkup,
        agentMarkup,
        appliedMarkup: overrides?.applyMarkup !== false
    };
}
}),
"[project]/Downloads/travel-booking-platform/lib/markup-settings.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Centralized markup preference handling for agents and admins
__turbopack_context__.s([
    "DEFAULT_AGENT_MARKUP",
    ()=>DEFAULT_AGENT_MARKUP,
    "DEFAULT_SUPER_ADMIN_MARKUP",
    ()=>DEFAULT_SUPER_ADMIN_MARKUP,
    "loadMarkupPreferences",
    ()=>loadMarkupPreferences,
    "persistMarkupPreferences",
    ()=>persistMarkupPreferences,
    "resolveAgentMarkup",
    ()=>resolveAgentMarkup
]);
const STORAGE_KEY = "markup_preferences";
const DEFAULT_SUPER_ADMIN_MARKUP = 500;
const DEFAULT_AGENT_MARKUP = 500;
function loadMarkupPreferences() {
    if ("TURBOPACK compile-time truthy", 1) {
        return {
            superAdminMarkup: DEFAULT_SUPER_ADMIN_MARKUP,
            defaultAgentMarkup: DEFAULT_AGENT_MARKUP,
            agentOverrides: {},
            superAdminMarkupOverrides: {},
            allowAgentOverride: true
        };
    }
    //TURBOPACK unreachable
    ;
    const stored = undefined;
}
function persistMarkupPreferences(preferences) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function resolveAgentMarkup(userId, role) {
    const prefs = loadMarkupPreferences();
    const isAgent = role === "AGENT" || role === "SUB_AGENT" || role === "AGENCY_ADMIN";
    const agentMarkup = isAgent ? prefs.agentOverrides[userId] ?? prefs.defaultAgentMarkup : 0;
    // Use agent-specific super admin markup override if exists, otherwise use default
    const superAdminMarkup = prefs.superAdminMarkupOverrides[userId] ?? prefs.superAdminMarkup;
    return {
        superAdminMarkup,
        agentMarkup,
        allowAgentOverride: prefs.allowAgentOverride
    };
}
;
}),
"[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LockedTicketsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$local$2d$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/lib/local-db.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/lib/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/components/ui/table.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/components/ui/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/components/ui/dialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/components/ui/label.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$audit$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/lib/audit-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$policy$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/lib/policy-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$wallet$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/lib/wallet-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$pricing$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/lib/pricing-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$markup$2d$settings$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/lib/markup-settings.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function LockedTicketsPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { currentUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppStore"])();
    const [locks, setLocks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [convertDialogOpen, setConvertDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedLock, setSelectedLock] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [paymentMethod, setPaymentMethod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [acceptTerms, setAcceptTerms] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        loadLocks();
        // Refresh every minute to update countdown timers
        const interval = setInterval(loadLocks, 60000);
        return ()=>clearInterval(interval);
    }, []);
    const loadLocks = async ()=>{
        try {
            setLoading(true);
            const allLocks = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$local$2d$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ticketLocksDB"].readAll();
            // Filter to show only active locks for current agent, or all for super admin
            const isSuperAdmin = currentUser.role === "SUPER_ADMIN";
            const filtered = allLocks.filter((lock)=>{
                if (lock.status !== "LOCKED") return false;
                const now = new Date().toISOString();
                if (lock.expiresAt <= now) {
                    // Auto-expire old locks
                    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$local$2d$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ticketLocksDB"].update(lock.id, {
                        status: "EXPIRED"
                    });
                    return false;
                }
                return isSuperAdmin || lock.agentId === currentUser.id;
            });
            setLocks(filtered);
        } catch (error) {
            console.error("Failed to load locks:", error);
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Failed to load locked tickets");
        } finally{
            setLoading(false);
        }
    };
    const getTimeRemaining = (expiresAt)=>{
        try {
            const expires = new Date(expiresAt);
            const now = new Date();
            if (expires <= now) return "Expired";
            const diffMs = expires.getTime() - now.getTime();
            const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
            const diffMinutes = Math.floor(diffMs % (1000 * 60 * 60) / (1000 * 60));
            if (diffHours > 0) {
                return `${diffHours}h ${diffMinutes}m`;
            }
            return `${diffMinutes}m`;
        } catch  {
            return "Invalid date";
        }
    };
    const handleConvertToBooking = async (lock)=>{
        setSelectedLock(lock);
        setConvertDialogOpen(true);
    };
    const handleConfirmConversion = async ()=>{
        if (!selectedLock) return;
        if (!paymentMethod) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Please select a payment method");
            return;
        }
        if (!acceptTerms) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Please accept terms and conditions");
            return;
        }
        try {
            // Check wallet balance if using wallet
            if (paymentMethod === "wallet") {
                const walletBalance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$wallet$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getWalletBalance"])();
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$wallet$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasSufficientBalance"])(selectedLock.lockedPrice)) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Insufficient wallet balance", {
                        description: `Wallet balance (₹${walletBalance.toLocaleString("en-IN")}) is less than locked price (₹${selectedLock.lockedPrice.toLocaleString("en-IN")}).`,
                        action: {
                            label: "Add Funds",
                            onClick: ()=>router.push("/dashboard/wallet")
                        }
                    });
                    return;
                }
            }
            // Generate booking details
            const newBookingId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$policy$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateBookingId"])("FLIGHT");
            const newPnr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$policy$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generatePNR"])();
            // Calculate pricing breakdown
            const resolvedMarkup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$markup$2d$settings$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveAgentMarkup"])(currentUser.id, currentUser.role);
            const breakdown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$pricing$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calculatePricingBreakdown"])(selectedLock.flightDetails.price, 3750, "flights", selectedLock.searchData.isInternational ? "International" : "Domestic", "Regular", selectedLock.flightDetails.currency || "INR", {
                superAdminMarkup: resolvedMarkup.superAdminMarkup,
                agentMarkup: resolvedMarkup.agentMarkup,
                applyMarkup: true
            });
            const ancillariesTotal = (selectedLock.ancillaries?.extraBaggage ? selectedLock.ancillaries.extraBaggagePrice : 0) + (selectedLock.ancillaries?.mealSelection ? selectedLock.ancillaries.mealPrice : 0) + (selectedLock.ancillaries?.seatSelection ? selectedLock.ancillaries.seatPrice : 0);
            const bookingTotal = breakdown.totalAmount + ancillariesTotal;
            // Create booking
            const booking = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$local$2d$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["bookingsDB"].create({
                type: "FLIGHT",
                status: "CONFIRMED",
                details: {
                    ...selectedLock.flightDetails,
                    bookingId: newBookingId,
                    pnr: newPnr,
                    passengerDetails: selectedLock.passengerDetails || {},
                    passengerCount: selectedLock.passengerCount || {
                        adults: 1,
                        children: 0,
                        infants: 0
                    },
                    ancillaries: selectedLock.ancillaries || {},
                    seatSelections: selectedLock.seatSelections || [],
                    markup: {
                        applied: true,
                        superAdminMarkup: breakdown.superAdminMarkup ?? 0,
                        agentMarkup: resolvedMarkup.agentMarkup,
                        totalMarkup: breakdown.markup ?? 0,
                        showOnDocs: true
                    }
                },
                date: new Date().toISOString().split("T")[0],
                amount: bookingTotal,
                agentName: selectedLock.agentName,
                agentId: selectedLock.agentId,
                approvalStatus: "APPROVED"
            });
            // Create transaction if using wallet
            if (paymentMethod === "wallet") {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$wallet$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createTransaction"])({
                    date: new Date().toISOString().split("T")[0],
                    description: `Flight Booking ${booking.bookingId} (from locked ticket)`,
                    amount: -bookingTotal,
                    type: "DEBIT",
                    status: "Completed",
                    paymentMethod: "Wallet",
                    productType: "Flight",
                    bookingId: booking.id
                });
            }
            // Update lock status
            await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$local$2d$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ticketLocksDB"].update(selectedLock.id, {
                status: "CONVERTED"
            });
            await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$audit$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["audit"].create("ticket_locks", selectedLock.id, {
                action: "CONVERTED_TO_BOOKING",
                bookingId: booking.id,
                agentId: currentUser.id
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Booking confirmed!", {
                description: `Booking ID: ${newBookingId}, PNR: ${newPnr}. Ticket converted from lock.`
            });
            setConvertDialogOpen(false);
            setSelectedLock(null);
            setPaymentMethod("");
            setAcceptTerms(false);
            loadLocks();
            router.push(`/dashboard/bookings`);
        } catch (error) {
            console.error("Failed to convert lock to booking:", error);
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Failed to convert ticket lock", {
                description: "An error occurred while converting the lock to a booking."
            });
        }
    };
    const handleCancelLock = async (lock)=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$local$2d$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ticketLocksDB"].update(lock.id, {
                status: "CANCELLED"
            });
            await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$audit$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["audit"].create("ticket_locks", lock.id, {
                action: "CANCELLED",
                agentId: currentUser.id
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Ticket lock cancelled");
            loadLocks();
        } catch (error) {
            console.error("Failed to cancel lock:", error);
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Failed to cancel ticket lock");
        }
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center min-h-[400px]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-muted-foreground",
                children: "Loading locked tickets..."
            }, void 0, false, {
                fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                lineNumber: 229,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
            lineNumber: 228,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-bold tracking-tight",
                                children: "Locked Tickets"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                lineNumber: 238,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted-foreground",
                                children: "View and manage tickets locked for 48 hours at a fixed price."
                            }, void 0, false, {
                                fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                lineNumber: 239,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                        lineNumber: 237,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        onClick: ()=>router.push("/dashboard/flights"),
                        children: "Back to Flights"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                        lineNumber: 243,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                lineNumber: 236,
                columnNumber: 7
            }, this),
            locks.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border rounded-lg p-12 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                        className: "h-12 w-12 mx-auto text-muted-foreground mb-4"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                        lineNumber: 250,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold mb-2",
                        children: "No locked tickets"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                        lineNumber: 251,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground mb-4",
                        children: "You don't have any active ticket locks. Lock tickets from the fare review stage to hold them for 48 hours."
                    }, void 0, false, {
                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                        lineNumber: 252,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: ()=>router.push("/dashboard/flights"),
                        children: "Search Flights"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                        lineNumber: 255,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                lineNumber: 249,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-md border bg-card",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Table"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHeader"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableRow"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                        children: "Lock ID"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                        lineNumber: 262,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                        children: "Flight"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                        lineNumber: 263,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                        children: "Route"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                        lineNumber: 264,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                        children: "Quantity"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                        lineNumber: 265,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                        children: "Price per Ticket"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                        lineNumber: 266,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                        children: "Total Price"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                        lineNumber: 267,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                        children: "Time Remaining"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                        lineNumber: 268,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                        children: "Agent"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                        lineNumber: 269,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                        children: "Status"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                        lineNumber: 270,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                        className: "text-right",
                                        children: "Actions"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                        lineNumber: 271,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                lineNumber: 261,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                            lineNumber: 260,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableBody"], {
                            children: locks.map((lock)=>{
                                const timeRemaining = getTimeRemaining(lock.expiresAt);
                                const expires = new Date(lock.expiresAt);
                                const now = new Date();
                                const diffHours = (expires.getTime() - now.getTime()) / (1000 * 60 * 60);
                                const isExpiringSoon = diffHours > 0 && diffHours < 2;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableRow"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                            className: "font-mono text-sm",
                                            children: lock.lockId
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                            lineNumber: 284,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-medium",
                                                        children: lock.flightDetails.airline
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                                        lineNumber: 287,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-muted-foreground",
                                                        children: lock.flightDetails.flightNumber
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                                        lineNumber: 288,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                                lineNumber: 286,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                            lineNumber: 285,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm",
                                                        children: [
                                                            lock.flightDetails.departure.city,
                                                            " → ",
                                                            lock.flightDetails.arrival.city
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                                        lineNumber: 293,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-muted-foreground",
                                                        children: new Date(lock.flightDetails.departure.time).toLocaleDateString()
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                                        lineNumber: 296,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                                lineNumber: 292,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                            lineNumber: 291,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-semibold",
                                                children: [
                                                    lock.quantity || 1,
                                                    " ticket",
                                                    (lock.quantity || 1) > 1 ? "s" : ""
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                                lineNumber: 302,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                            lineNumber: 301,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-semibold",
                                                children: [
                                                    "₹",
                                                    (lock.pricePerTicket || lock.lockedPrice / (lock.quantity || 1)).toLocaleString("en-IN")
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                                lineNumber: 305,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                            lineNumber: 304,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-semibold",
                                                children: [
                                                    "₹",
                                                    lock.lockedPrice.toLocaleString("en-IN")
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                                lineNumber: 308,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                            lineNumber: 307,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                        className: `h-4 w-4 ${isExpiringSoon ? "text-orange-500" : "text-muted-foreground"}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                                        lineNumber: 312,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: isExpiringSoon ? "text-orange-500 font-semibold" : "",
                                                        children: timeRemaining
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                                        lineNumber: 313,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                                lineNumber: 311,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                            lineNumber: 310,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm",
                                                children: lock.agentName
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                                lineNumber: 319,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                            lineNumber: 318,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                variant: "secondary",
                                                className: "bg-blue-500 text-white",
                                                children: "Locked"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                                lineNumber: 322,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                            lineNumber: 321,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                            className: "text-right",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-end gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                        size: "sm",
                                                        onClick: ()=>handleConvertToBooking(lock),
                                                        disabled: timeRemaining === "Expired",
                                                        children: "Convert to Booking"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                                        lineNumber: 328,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                        size: "sm",
                                                        variant: "outline",
                                                        onClick: ()=>handleCancelLock(lock),
                                                        children: "Cancel"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                                        lineNumber: 335,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                                lineNumber: 327,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                            lineNumber: 326,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, lock.id, true, {
                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                    lineNumber: 283,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                            lineNumber: 274,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                    lineNumber: 259,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                lineNumber: 258,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
                open: convertDialogOpen,
                onOpenChange: setConvertDialogOpen,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogContent"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    children: "Convert Locked Ticket to Booking"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                    lineNumber: 356,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    children: [
                                        "Complete the booking for this locked ticket. The price is locked at ₹",
                                        selectedLock?.lockedPrice.toLocaleString("en-IN"),
                                        "."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                    lineNumber: 357,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                            lineNumber: 355,
                            columnNumber: 11
                        }, this),
                        selectedLock && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4 py-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-muted/50 rounded-lg p-4 space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm text-muted-foreground",
                                                    children: "Flight:"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                                    lineNumber: 366,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium",
                                                    children: [
                                                        selectedLock.flightDetails.airline,
                                                        " - ",
                                                        selectedLock.flightDetails.flightNumber
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                                    lineNumber: 367,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                            lineNumber: 365,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm text-muted-foreground",
                                                    children: "Route:"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                                    lineNumber: 372,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium",
                                                    children: [
                                                        selectedLock.flightDetails.departure.city,
                                                        " → ",
                                                        selectedLock.flightDetails.arrival.city
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                                    lineNumber: 373,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                            lineNumber: 371,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm text-muted-foreground",
                                                    children: "Quantity:"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                                    lineNumber: 378,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium",
                                                    children: [
                                                        selectedLock.quantity || 1,
                                                        " ticket",
                                                        (selectedLock.quantity || 1) > 1 ? "s" : ""
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                                    lineNumber: 379,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                            lineNumber: 377,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm text-muted-foreground",
                                                    children: "Price per Ticket:"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                                    lineNumber: 382,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium",
                                                    children: [
                                                        "₹",
                                                        (selectedLock.pricePerTicket || selectedLock.lockedPrice / (selectedLock.quantity || 1)).toLocaleString("en-IN")
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                                    lineNumber: 383,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                            lineNumber: 381,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm text-muted-foreground",
                                                    children: "Total Locked Price:"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                                    lineNumber: 386,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-lg",
                                                    children: [
                                                        "₹",
                                                        selectedLock.lockedPrice.toLocaleString("en-IN")
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                                    lineNumber: 387,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                            lineNumber: 385,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm text-muted-foreground",
                                                    children: "Time Remaining:"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                                    lineNumber: 390,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium",
                                                    children: getTimeRemaining(selectedLock.expiresAt)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                                    lineNumber: 391,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                            lineNumber: 389,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                    lineNumber: 364,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Payment Method *"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                            lineNumber: 396,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            className: "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm",
                                            value: paymentMethod,
                                            onChange: (e)=>setPaymentMethod(e.target.value),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "Select payment method"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                                    lineNumber: 402,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "wallet",
                                                    children: "Wallet"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                                    lineNumber: 403,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "card",
                                                    children: "Credit/Debit Card"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                                    lineNumber: 404,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "netbanking",
                                                    children: "Net Banking"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                                    lineNumber: 405,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                            lineNumber: 397,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                    lineNumber: 395,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            id: "acceptTermsConvert",
                                            checked: acceptTerms,
                                            onChange: (e)=>setAcceptTerms(e.target.checked),
                                            className: "rounded border-gray-300"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                            lineNumber: 410,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                            htmlFor: "acceptTermsConvert",
                                            className: "cursor-pointer text-sm",
                                            children: [
                                                "I accept the terms and conditions ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                                    lineNumber: 418,
                                                    columnNumber: 53
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                            lineNumber: 417,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                    lineNumber: 409,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                            lineNumber: 363,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogFooter"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    onClick: ()=>setConvertDialogOpen(false),
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                    lineNumber: 424,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: handleConfirmConversion,
                                    disabled: !paymentMethod || !acceptTerms,
                                    children: "Confirm Booking"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                                    lineNumber: 427,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                            lineNumber: 423,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                    lineNumber: 354,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
                lineNumber: 353,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/flights/locked-tickets/page.tsx",
        lineNumber: 235,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=Downloads_travel-booking-platform_337bf916._.js.map