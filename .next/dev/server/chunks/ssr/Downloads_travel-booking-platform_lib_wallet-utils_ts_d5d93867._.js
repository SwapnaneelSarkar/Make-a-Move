module.exports = [
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
];

//# sourceMappingURL=Downloads_travel-booking-platform_lib_wallet-utils_ts_d5d93867._.js.map