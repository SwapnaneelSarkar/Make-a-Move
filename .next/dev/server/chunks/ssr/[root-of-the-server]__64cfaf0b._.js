module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Downloads/travel-booking-platform/components/theme-provider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
'use client';
;
;
function ThemeProvider({ children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/theme-provider.tsx",
        lineNumber: 10,
        columnNumber: 10
    }, this);
}
}),
"[project]/Downloads/travel-booking-platform/components/ui/sonner.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toaster",
    ()=>Toaster
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
const Toaster = ({ ...props })=>{
    const { theme = "system" } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Toaster"], {
        theme: theme,
        className: "toaster group",
        toastOptions: {
            classNames: {
                toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
                description: "group-[.toast]:text-muted-foreground",
                actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
            }
        },
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/sonner.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Downloads/travel-booking-platform/lib/mock-data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Comprehensive mock data for the Travel Booking Platform
__turbopack_context__.s([
    "MOCK_BOOKINGS",
    ()=>MOCK_BOOKINGS,
    "MOCK_FLIGHTS",
    ()=>MOCK_FLIGHTS,
    "MOCK_HOTELS",
    ()=>MOCK_HOTELS,
    "MOCK_STATS",
    ()=>MOCK_STATS,
    "MOCK_USERS",
    ()=>MOCK_USERS
]);
const MOCK_USERS = [
    {
        id: "u1",
        name: "Alex Super",
        email: "superadmin@example.com",
        role: "SUPER_ADMIN",
        avatar: "/admin-interface.png"
    },
    {
        id: "u2",
        name: "Sarah Agency",
        email: "agencyadmin@example.com",
        role: "AGENCY_ADMIN",
        avatar: "/diverse-team-manager.png",
        department: "Operations",
        walletBalance: 25000
    },
    {
        id: "u3",
        name: "John Agent",
        email: "agent@example.com",
        role: "AGENT",
        avatar: "/diverse-office-employee.png",
        department: "Sales",
        policyId: "p1"
    },
    {
        id: "u4",
        name: "Mike SubAgent",
        email: "subagent@example.com",
        role: "SUB_AGENT",
        avatar: "/placeholder-user.jpg",
        department: "Sales",
        walletBalance: 5000
    },
    {
        id: "u5",
        name: "Emma Finance",
        email: "finance@example.com",
        role: "FINANCE_TEAM",
        avatar: "/placeholder-user.jpg",
        department: "Finance"
    },
    {
        id: "u6",
        name: "David Support",
        email: "support@example.com",
        role: "SUPPORT_TEAM",
        avatar: "/placeholder-user.jpg",
        department: "Support"
    },
    {
        id: "u7",
        name: "Lisa KYC",
        email: "kyc@example.com",
        role: "KYC_COMPLIANCE_TEAM",
        avatar: "/placeholder-user.jpg",
        department: "Compliance"
    }
];
const MOCK_HOTELS = [
    // Mumbai Hotels
    {
        id: "h1",
        name: "Grand Hyatt Mumbai",
        location: "mumbai",
        rating: 5,
        pricePerNight: 15000,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Gym",
            "Breakfast"
        ],
        description: "Luxury hotel located in the heart of Mumbai with state-of-the-art amenities.",
        policyCompliant: true,
        requiresNationality: true,
        requiresGST: true,
        minAge: 18,
        rooms: [
            {
                id: "r1",
                type: "Deluxe King Room",
                description: "King bed, City view, Free WiFi, 35 sqm",
                maxOccupancy: 2,
                pricePerNight: 15000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 2000
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 3500
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 5000
                    }
                ],
                cancellationPolicy: "Free cancellation until 48 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            },
            {
                id: "r2",
                type: "Club Suite",
                description: "Lounge access, Breakfast included, 50 sqm",
                maxOccupancy: 3,
                pricePerNight: 23000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 2000
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 3500
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 5000
                    }
                ],
                cancellationPolicy: "Free cancellation until 72 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar",
                    "Lounge Access",
                    "Breakfast"
                ]
            }
        ]
    },
    {
        id: "h1-2",
        name: "Taj Lands End Mumbai",
        location: "mumbai",
        rating: 5,
        pricePerNight: 18000,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Fine Dining",
            "Beach Access"
        ],
        description: "Seaside luxury hotel with stunning views of the Arabian Sea.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: true,
        minAge: 18,
        rooms: [
            {
                id: "r1-2",
                type: "Sea View Room",
                description: "King bed, Sea view, Balcony, 40 sqm",
                maxOccupancy: 2,
                pricePerNight: 18000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 2500
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 4000
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 6000
                    }
                ],
                cancellationPolicy: "Free cancellation until 48 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar",
                    "Balcony"
                ]
            }
        ]
    },
    {
        id: "h1-3",
        name: "The Leela Mumbai",
        location: "mumbai",
        rating: 5,
        pricePerNight: 16500,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Gym",
            "Business Center"
        ],
        description: "Luxury business hotel in the financial district.",
        policyCompliant: true,
        requiresNationality: true,
        requiresGST: true,
        minAge: 18,
        rooms: [
            {
                id: "r1-3",
                type: "Executive Room",
                description: "King bed, City view, Workspace, 38 sqm",
                maxOccupancy: 2,
                pricePerNight: 16500,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 2200
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 3800
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 5500
                    }
                ],
                cancellationPolicy: "Free cancellation until 48 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar",
                    "Workspace"
                ]
            }
        ]
    },
    {
        id: "h1-4",
        name: "Novotel Mumbai Juhu Beach",
        location: "mumbai",
        rating: 4,
        pricePerNight: 8500,
        currency: "INR",
        image: "/modern-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Restaurant",
            "Beach Access"
        ],
        description: "Modern beachfront hotel perfect for leisure travelers.",
        policyCompliant: true,
        requiresNationality: false,
        requiresGST: false,
        rooms: [
            {
                id: "r1-4",
                type: "Standard Room",
                description: "King or Twin beds, Beach view, 30 sqm",
                maxOccupancy: 2,
                pricePerNight: 8500,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 1500
                    }
                ],
                cancellationPolicy: "Free cancellation until 24 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV"
                ]
            }
        ]
    },
    {
        id: "h1-5",
        name: "ITC Maratha Mumbai",
        location: "mumbai",
        rating: 5,
        pricePerNight: 19500,
        currency: "INR",
        image: "/luxury-lobby.jpg",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Multiple Restaurants",
            "Airport Shuttle"
        ],
        description: "Luxury hotel near Mumbai airport with traditional Indian hospitality.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: true,
        minAge: 18,
        rooms: [
            {
                id: "r1-5",
                type: "Tower Room",
                description: "King bed, Airport view, 42 sqm",
                maxOccupancy: 2,
                pricePerNight: 19500,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 2800
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 4500
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 6500
                    }
                ],
                cancellationPolicy: "Free cancellation until 72 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar",
                    "Airport Shuttle"
                ]
            }
        ]
    },
    // Bangalore Hotels
    {
        id: "h2",
        name: "Ibis Styles Bangalore",
        location: "bangalore",
        rating: 4,
        pricePerNight: 7000,
        currency: "INR",
        image: "/modern-hotel-room.png",
        amenities: [
            "WiFi",
            "Restaurant",
            "Meeting Rooms"
        ],
        description: "Contemporary hotel perfect for business travelers.",
        policyCompliant: true,
        requiresNationality: false,
        requiresGST: false,
        rooms: [
            {
                id: "r3",
                type: "Standard Twin Room",
                description: "Twin beds, City view, Free WiFi, 25 sqm",
                maxOccupancy: 2,
                pricePerNight: 7000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 1500
                    }
                ],
                cancellationPolicy: "Free cancellation until 24 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV"
                ]
            },
            {
                id: "r4",
                type: "Executive Room",
                description: "King bed, Workspace, Free WiFi, 30 sqm",
                maxOccupancy: 2,
                pricePerNight: 9000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 1500
                    }
                ],
                cancellationPolicy: "Free cancellation until 24 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Workspace"
                ]
            }
        ]
    },
    {
        id: "h2-2",
        name: "The Ritz-Carlton Bangalore",
        location: "bangalore",
        rating: 5,
        pricePerNight: 22000,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Fine Dining",
            "Rooftop Bar"
        ],
        description: "Ultra-luxury hotel in the heart of Bangalore's business district.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: true,
        minAge: 18,
        rooms: [
            {
                id: "r2-2",
                type: "Deluxe Room",
                description: "King bed, City view, 45 sqm",
                maxOccupancy: 2,
                pricePerNight: 22000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 3000
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 5000
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 7000
                    }
                ],
                cancellationPolicy: "Free cancellation until 7 days before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar",
                    "Butler Service"
                ]
            }
        ]
    },
    {
        id: "h2-3",
        name: "Taj West End Bangalore",
        location: "bangalore",
        rating: 5,
        pricePerNight: 18500,
        currency: "INR",
        image: "/luxury-lobby.jpg",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Gardens",
            "Heritage Building"
        ],
        description: "Heritage luxury hotel set in 20 acres of landscaped gardens.",
        policyCompliant: true,
        requiresNationality: true,
        requiresGST: true,
        minAge: 18,
        rooms: [
            {
                id: "r2-3",
                type: "Garden View Room",
                description: "King bed, Garden view, 40 sqm",
                maxOccupancy: 2,
                pricePerNight: 18500,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 2700
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 4500
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 6500
                    }
                ],
                cancellationPolicy: "Free cancellation until 48 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            }
        ]
    },
    {
        id: "h2-4",
        name: "Radisson Blu Bangalore",
        location: "bangalore",
        rating: 4,
        pricePerNight: 12000,
        currency: "INR",
        image: "/modern-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Gym",
            "Restaurant",
            "Business Center"
        ],
        description: "Modern business hotel with excellent connectivity.",
        policyCompliant: true,
        requiresNationality: false,
        requiresGST: true,
        rooms: [
            {
                id: "r2-4",
                type: "Superior Room",
                description: "King bed, City view, 32 sqm",
                maxOccupancy: 2,
                pricePerNight: 12000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 1800
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 3200
                    }
                ],
                cancellationPolicy: "Free cancellation until 24 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            }
        ]
    },
    {
        id: "h2-5",
        name: "Lemon Tree Premier Bangalore",
        location: "bangalore",
        rating: 4,
        pricePerNight: 9500,
        currency: "INR",
        image: "/modern-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Gym",
            "Restaurant"
        ],
        description: "Value-for-money hotel with modern amenities.",
        policyCompliant: true,
        requiresNationality: false,
        requiresGST: false,
        rooms: [
            {
                id: "r2-5",
                type: "Premier Room",
                description: "King bed, City view, 28 sqm",
                maxOccupancy: 2,
                pricePerNight: 9500,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 1500
                    }
                ],
                cancellationPolicy: "Free cancellation until 24 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV"
                ]
            }
        ]
    },
    // New Delhi Hotels
    {
        id: "h3",
        name: "The Oberoi New Delhi",
        location: "delhi",
        rating: 5,
        pricePerNight: 21000,
        currency: "INR",
        image: "/luxury-lobby.jpg",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Fine Dining",
            "Concierge"
        ],
        description: "Iconic luxury hotel overlooking the Delhi Golf Course.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: true,
        minAge: 18,
        rooms: [
            {
                id: "r5",
                type: "Deluxe Room",
                description: "King bed, Golf course view, 45 sqm",
                maxOccupancy: 2,
                pricePerNight: 21000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 3000
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 5000
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 7000
                    }
                ],
                cancellationPolicy: "Free cancellation until 7 days before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar",
                    "Butler Service"
                ]
            }
        ]
    },
    {
        id: "h3-2",
        name: "The Taj Mahal Hotel New Delhi",
        location: "delhi",
        rating: 5,
        pricePerNight: 24000,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Fine Dining",
            "Historic Building"
        ],
        description: "Historic luxury hotel in the heart of New Delhi.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: true,
        minAge: 18,
        rooms: [
            {
                id: "r3-2",
                type: "Heritage Room",
                description: "King bed, Historic charm, 48 sqm",
                maxOccupancy: 2,
                pricePerNight: 24000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 3500
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 5500
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 8000
                    }
                ],
                cancellationPolicy: "Free cancellation until 7 days before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar",
                    "Butler Service"
                ]
            }
        ]
    },
    {
        id: "h3-3",
        name: "ITC Maurya New Delhi",
        location: "delhi",
        rating: 5,
        pricePerNight: 19500,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Multiple Restaurants",
            "Diplomatic Area"
        ],
        description: "Luxury hotel in the diplomatic enclave.",
        policyCompliant: true,
        requiresNationality: true,
        requiresGST: true,
        minAge: 18,
        rooms: [
            {
                id: "r3-3",
                type: "Executive Room",
                description: "King bed, City view, 42 sqm",
                maxOccupancy: 2,
                pricePerNight: 19500,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 2800
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 4500
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 6500
                    }
                ],
                cancellationPolicy: "Free cancellation until 48 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            }
        ]
    },
    {
        id: "h3-4",
        name: "The Leela Palace New Delhi",
        location: "delhi",
        rating: 5,
        pricePerNight: 22500,
        currency: "INR",
        image: "/luxury-lobby.jpg",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Fine Dining",
            "Palace Architecture"
        ],
        description: "Palatial luxury hotel with traditional Indian architecture.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: true,
        minAge: 18,
        rooms: [
            {
                id: "r3-4",
                type: "Palace Room",
                description: "King bed, Palace view, 50 sqm",
                maxOccupancy: 2,
                pricePerNight: 22500,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 3200
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 5200
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 7500
                    }
                ],
                cancellationPolicy: "Free cancellation until 7 days before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar",
                    "Butler Service"
                ]
            }
        ]
    },
    {
        id: "h3-5",
        name: "Holiday Inn New Delhi",
        location: "delhi",
        rating: 4,
        pricePerNight: 11000,
        currency: "INR",
        image: "/modern-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Gym",
            "Restaurant",
            "Airport Shuttle"
        ],
        description: "Comfortable hotel near airport with modern amenities.",
        policyCompliant: true,
        requiresNationality: false,
        requiresGST: false,
        rooms: [
            {
                id: "r3-5",
                type: "Standard Room",
                description: "King or Twin beds, 30 sqm",
                maxOccupancy: 2,
                pricePerNight: 11000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 1800
                    }
                ],
                cancellationPolicy: "Free cancellation until 24 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV"
                ]
            }
        ]
    },
    // Chennai Hotels
    {
        id: "h4",
        name: "The Leela Palace Chennai",
        location: "chennai",
        rating: 5,
        pricePerNight: 17500,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Beach Access",
            "Fine Dining"
        ],
        description: "Luxury beachfront hotel with stunning sea views.",
        policyCompliant: true,
        requiresNationality: true,
        requiresGST: true,
        minAge: 18,
        rooms: [
            {
                id: "r4-1",
                type: "Sea View Room",
                description: "King bed, Sea view, 40 sqm",
                maxOccupancy: 2,
                pricePerNight: 17500,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 2500
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 4000
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 6000
                    }
                ],
                cancellationPolicy: "Free cancellation until 48 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            }
        ]
    },
    {
        id: "h4-2",
        name: "ITC Grand Chola Chennai",
        location: "chennai",
        rating: 5,
        pricePerNight: 19000,
        currency: "INR",
        image: "/luxury-lobby.jpg",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Multiple Restaurants",
            "Business Center"
        ],
        description: "Grand luxury hotel inspired by Chola dynasty architecture.",
        policyCompliant: true,
        requiresNationality: true,
        requiresGST: true,
        minAge: 18,
        rooms: [
            {
                id: "r4-2",
                type: "Grand Room",
                description: "King bed, City view, 45 sqm",
                maxOccupancy: 2,
                pricePerNight: 19000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 2700
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 4500
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 6500
                    }
                ],
                cancellationPolicy: "Free cancellation until 48 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            }
        ]
    },
    {
        id: "h4-3",
        name: "Taj Coromandel Chennai",
        location: "chennai",
        rating: 5,
        pricePerNight: 16500,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Fine Dining",
            "Heritage"
        ],
        description: "Heritage luxury hotel in the heart of Chennai.",
        policyCompliant: true,
        requiresNationality: true,
        requiresGST: true,
        minAge: 18,
        rooms: [
            {
                id: "r4-3",
                type: "Heritage Room",
                description: "King bed, Heritage charm, 38 sqm",
                maxOccupancy: 2,
                pricePerNight: 16500,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 2300
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 3800
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 5500
                    }
                ],
                cancellationPolicy: "Free cancellation until 48 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            }
        ]
    },
    {
        id: "h4-4",
        name: "Radisson Blu Chennai",
        location: "chennai",
        rating: 4,
        pricePerNight: 10500,
        currency: "INR",
        image: "/modern-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Gym",
            "Restaurant"
        ],
        description: "Modern business hotel with excellent facilities.",
        policyCompliant: true,
        requiresNationality: false,
        requiresGST: true,
        rooms: [
            {
                id: "r4-4",
                type: "Superior Room",
                description: "King bed, City view, 32 sqm",
                maxOccupancy: 2,
                pricePerNight: 10500,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 1700
                    }
                ],
                cancellationPolicy: "Free cancellation until 24 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV"
                ]
            }
        ]
    },
    // Hyderabad Hotels
    {
        id: "h5",
        name: "Taj Falaknuma Palace Hyderabad",
        location: "hyderabad",
        rating: 5,
        pricePerNight: 35000,
        currency: "INR",
        image: "/luxury-lobby.jpg",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Palace Tours",
            "Fine Dining"
        ],
        description: "Historic palace hotel, once the residence of the Nizam of Hyderabad.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: true,
        minAge: 18,
        rooms: [
            {
                id: "r5-1",
                type: "Palace Room",
                description: "King bed, Palace view, 55 sqm",
                maxOccupancy: 2,
                pricePerNight: 35000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 5000
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 8000
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 12000
                    }
                ],
                cancellationPolicy: "Free cancellation until 14 days before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar",
                    "Butler Service",
                    "Palace Tour"
                ]
            }
        ]
    },
    {
        id: "h5-2",
        name: "ITC Kohenur Hyderabad",
        location: "hyderabad",
        rating: 5,
        pricePerNight: 18500,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Business Center",
            "Multiple Restaurants"
        ],
        description: "Luxury business hotel in HITEC City.",
        policyCompliant: true,
        requiresNationality: true,
        requiresGST: true,
        minAge: 18,
        rooms: [
            {
                id: "r5-2",
                type: "Executive Room",
                description: "King bed, City view, 42 sqm",
                maxOccupancy: 2,
                pricePerNight: 18500,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 2700
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 4500
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 6500
                    }
                ],
                cancellationPolicy: "Free cancellation until 48 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            }
        ]
    },
    {
        id: "h5-3",
        name: "Park Hyatt Hyderabad",
        location: "hyderabad",
        rating: 5,
        pricePerNight: 20000,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Fine Dining",
            "Rooftop Bar"
        ],
        description: "Ultra-luxury hotel with contemporary design.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: true,
        minAge: 18,
        rooms: [
            {
                id: "r5-3",
                type: "Park Room",
                description: "King bed, Park view, 45 sqm",
                maxOccupancy: 2,
                pricePerNight: 20000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 2900
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 4800
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 7000
                    }
                ],
                cancellationPolicy: "Free cancellation until 48 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            }
        ]
    },
    {
        id: "h5-4",
        name: "Novotel Hyderabad",
        location: "hyderabad",
        rating: 4,
        pricePerNight: 9500,
        currency: "INR",
        image: "/modern-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Gym",
            "Restaurant"
        ],
        description: "Modern hotel perfect for business travelers.",
        policyCompliant: true,
        requiresNationality: false,
        requiresGST: false,
        rooms: [
            {
                id: "r5-4",
                type: "Standard Room",
                description: "King or Twin beds, 30 sqm",
                maxOccupancy: 2,
                pricePerNight: 9500,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 1500
                    }
                ],
                cancellationPolicy: "Free cancellation until 24 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV"
                ]
            }
        ]
    },
    // Kolkata Hotels
    {
        id: "h6",
        name: "The Oberoi Grand Kolkata",
        location: "kolkata",
        rating: 5,
        pricePerNight: 16000,
        currency: "INR",
        image: "/luxury-lobby.jpg",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Heritage Building",
            "Fine Dining"
        ],
        description: "Historic luxury hotel in the heart of Kolkata.",
        policyCompliant: true,
        requiresNationality: true,
        requiresGST: true,
        minAge: 18,
        rooms: [
            {
                id: "r6-1",
                type: "Heritage Room",
                description: "King bed, Heritage charm, 40 sqm",
                maxOccupancy: 2,
                pricePerNight: 16000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 2300
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 3800
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 5500
                    }
                ],
                cancellationPolicy: "Free cancellation until 48 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            }
        ]
    },
    {
        id: "h6-2",
        name: "ITC Sonar Kolkata",
        location: "kolkata",
        rating: 5,
        pricePerNight: 17000,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Business Center",
            "Multiple Restaurants"
        ],
        description: "Luxury hotel with modern amenities and traditional hospitality.",
        policyCompliant: true,
        requiresNationality: true,
        requiresGST: true,
        minAge: 18,
        rooms: [
            {
                id: "r6-2",
                type: "Executive Room",
                description: "King bed, City view, 38 sqm",
                maxOccupancy: 2,
                pricePerNight: 17000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 2400
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 4000
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 5800
                    }
                ],
                cancellationPolicy: "Free cancellation until 48 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            }
        ]
    },
    {
        id: "h6-3",
        name: "Taj Bengal Kolkata",
        location: "kolkata",
        rating: 5,
        pricePerNight: 18000,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Fine Dining",
            "Garden"
        ],
        description: "Luxury hotel set in beautiful gardens.",
        policyCompliant: true,
        requiresNationality: true,
        requiresGST: true,
        minAge: 18,
        rooms: [
            {
                id: "r6-3",
                type: "Garden View Room",
                description: "King bed, Garden view, 42 sqm",
                maxOccupancy: 2,
                pricePerNight: 18000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 2600
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 4200
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 6000
                    }
                ],
                cancellationPolicy: "Free cancellation until 48 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            }
        ]
    },
    // Pune Hotels
    {
        id: "h7",
        name: "Conrad Pune",
        location: "pune",
        rating: 5,
        pricePerNight: 14000,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Business Center",
            "Rooftop Bar"
        ],
        description: "Luxury hotel in the heart of Pune's business district.",
        policyCompliant: true,
        requiresNationality: true,
        requiresGST: true,
        minAge: 18,
        rooms: [
            {
                id: "r7-1",
                type: "Deluxe Room",
                description: "King bed, City view, 38 sqm",
                maxOccupancy: 2,
                pricePerNight: 14000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 2000
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 3500
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 5000
                    }
                ],
                cancellationPolicy: "Free cancellation until 48 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            }
        ]
    },
    {
        id: "h7-2",
        name: "Hyatt Pune",
        location: "pune",
        rating: 5,
        pricePerNight: 13500,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Gym",
            "Restaurant"
        ],
        description: "Modern luxury hotel with excellent facilities.",
        policyCompliant: true,
        requiresNationality: true,
        requiresGST: true,
        minAge: 18,
        rooms: [
            {
                id: "r7-2",
                type: "Regency Room",
                description: "King bed, 35 sqm",
                maxOccupancy: 2,
                pricePerNight: 13500,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 1900
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 3300
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 4800
                    }
                ],
                cancellationPolicy: "Free cancellation until 48 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            }
        ]
    },
    {
        id: "h7-3",
        name: "Lemon Tree Premier Pune",
        location: "pune",
        rating: 4,
        pricePerNight: 8000,
        currency: "INR",
        image: "/modern-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Gym",
            "Restaurant"
        ],
        description: "Value-for-money hotel with modern amenities.",
        policyCompliant: true,
        requiresNationality: false,
        requiresGST: false,
        rooms: [
            {
                id: "r7-3",
                type: "Premier Room",
                description: "King bed, 28 sqm",
                maxOccupancy: 2,
                pricePerNight: 8000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 1400
                    }
                ],
                cancellationPolicy: "Free cancellation until 24 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV"
                ]
            }
        ]
    },
    // Goa Hotels
    {
        id: "h8",
        name: "Taj Exotica Goa",
        location: "goa",
        rating: 5,
        pricePerNight: 22000,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Beach Access",
            "Water Sports"
        ],
        description: "Luxury beachfront resort with private beach access.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: true,
        minAge: 18,
        rooms: [
            {
                id: "r8-1",
                type: "Beach Villa",
                description: "King bed, Beach view, Private pool, 60 sqm",
                maxOccupancy: 2,
                pricePerNight: 22000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 3000
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 5000
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 7000
                    }
                ],
                cancellationPolicy: "Free cancellation until 7 days before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar",
                    "Private Pool"
                ]
            }
        ]
    },
    {
        id: "h8-2",
        name: "The Leela Goa",
        location: "goa",
        rating: 5,
        pricePerNight: 19500,
        currency: "INR",
        image: "/luxury-lobby.jpg",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Beach Access",
            "Multiple Restaurants"
        ],
        description: "Luxury beachfront resort with lagoon views.",
        policyCompliant: true,
        requiresNationality: true,
        requiresGST: true,
        minAge: 18,
        rooms: [
            {
                id: "r8-2",
                type: "Lagoon View Room",
                description: "King bed, Lagoon view, 45 sqm",
                maxOccupancy: 2,
                pricePerNight: 19500,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 2800
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 4500
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 6500
                    }
                ],
                cancellationPolicy: "Free cancellation until 48 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            }
        ]
    },
    {
        id: "h8-3",
        name: "Novotel Goa",
        location: "goa",
        rating: 4,
        pricePerNight: 12000,
        currency: "INR",
        image: "/modern-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Beach Access",
            "Restaurant"
        ],
        description: "Beachfront hotel perfect for leisure travelers.",
        policyCompliant: true,
        requiresNationality: false,
        requiresGST: false,
        rooms: [
            {
                id: "r8-3",
                type: "Beach View Room",
                description: "King bed, Beach view, 32 sqm",
                maxOccupancy: 2,
                pricePerNight: 12000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 1800
                    }
                ],
                cancellationPolicy: "Free cancellation until 24 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV"
                ]
            }
        ]
    },
    // International Hotels - Dubai
    {
        id: "h9",
        name: "Burj Al Arab Dubai",
        location: "dubai",
        rating: 5,
        pricePerNight: 45000,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Helipad",
            "Butler Service"
        ],
        description: "Iconic 7-star luxury hotel on its own island.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: false,
        minAge: 18,
        rooms: [
            {
                id: "r9-1",
                type: "Deluxe Suite",
                description: "King bed, Sea view, 170 sqm",
                maxOccupancy: 2,
                pricePerNight: 45000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 6000
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 10000
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 15000
                    }
                ],
                cancellationPolicy: "Free cancellation until 14 days before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar",
                    "Butler Service",
                    "Helipad Access"
                ]
            }
        ]
    },
    {
        id: "h9-2",
        name: "Atlantis The Palm Dubai",
        location: "dubai",
        rating: 5,
        pricePerNight: 35000,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Aquarium",
            "Water Park",
            "Multiple Restaurants"
        ],
        description: "Iconic resort on Palm Jumeirah with underwater suites.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: false,
        minAge: 18,
        rooms: [
            {
                id: "r9-2",
                type: "Deluxe Room",
                description: "King bed, Ocean view, 50 sqm",
                maxOccupancy: 2,
                pricePerNight: 35000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 5000
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 8000
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 12000
                    }
                ],
                cancellationPolicy: "Free cancellation until 7 days before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar",
                    "Water Park Access"
                ]
            }
        ]
    },
    {
        id: "h9-3",
        name: "Jumeirah Emirates Towers Dubai",
        location: "dubai",
        rating: 5,
        pricePerNight: 28000,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Business Center",
            "Fine Dining"
        ],
        description: "Luxury business hotel in the heart of Dubai.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: false,
        minAge: 18,
        rooms: [
            {
                id: "r9-3",
                type: "Executive Room",
                description: "King bed, City view, 45 sqm",
                maxOccupancy: 2,
                pricePerNight: 28000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 4000
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 6500
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 9500
                    }
                ],
                cancellationPolicy: "Free cancellation until 48 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            }
        ]
    },
    {
        id: "h9-4",
        name: "Holiday Inn Dubai",
        location: "dubai",
        rating: 4,
        pricePerNight: 15000,
        currency: "INR",
        image: "/modern-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Gym",
            "Restaurant"
        ],
        description: "Comfortable hotel with modern amenities.",
        policyCompliant: true,
        requiresNationality: true,
        requiresGST: false,
        rooms: [
            {
                id: "r9-4",
                type: "Standard Room",
                description: "King or Twin beds, 30 sqm",
                maxOccupancy: 2,
                pricePerNight: 15000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 2000
                    }
                ],
                cancellationPolicy: "Free cancellation until 24 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV"
                ]
            }
        ]
    },
    // Singapore Hotels
    {
        id: "h10",
        name: "Marina Bay Sands Singapore",
        location: "singapore",
        rating: 5,
        pricePerNight: 42000,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Infinity Pool",
            "Casino",
            "Shopping Mall",
            "SkyPark"
        ],
        description: "Iconic hotel with world's largest rooftop infinity pool.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: false,
        minAge: 18,
        rooms: [
            {
                id: "r10-1",
                type: "Deluxe Room",
                description: "King bed, City view, 45 sqm",
                maxOccupancy: 2,
                pricePerNight: 42000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 5500
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 9000
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 13000
                    }
                ],
                cancellationPolicy: "Free cancellation until 7 days before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar",
                    "SkyPark Access"
                ]
            }
        ]
    },
    {
        id: "h10-2",
        name: "The Ritz-Carlton Singapore",
        location: "singapore",
        rating: 5,
        pricePerNight: 38000,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Fine Dining",
            "Marina View"
        ],
        description: "Luxury hotel overlooking Marina Bay.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: false,
        minAge: 18,
        rooms: [
            {
                id: "r10-2",
                type: "Marina View Room",
                description: "King bed, Marina view, 50 sqm",
                maxOccupancy: 2,
                pricePerNight: 38000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 5000
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 8500
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 12000
                    }
                ],
                cancellationPolicy: "Free cancellation until 7 days before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            }
        ]
    },
    {
        id: "h10-3",
        name: "Shangri-La Singapore",
        location: "singapore",
        rating: 5,
        pricePerNight: 32000,
        currency: "INR",
        image: "/luxury-lobby.jpg",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Gardens",
            "Fine Dining"
        ],
        description: "Luxury hotel set in 15 acres of tropical gardens.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: false,
        minAge: 18,
        rooms: [
            {
                id: "r10-3",
                type: "Garden View Room",
                description: "King bed, Garden view, 42 sqm",
                maxOccupancy: 2,
                pricePerNight: 32000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 4500
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 7500
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 11000
                    }
                ],
                cancellationPolicy: "Free cancellation until 48 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            }
        ]
    },
    {
        id: "h10-4",
        name: "Holiday Inn Express Singapore",
        location: "singapore",
        rating: 4,
        pricePerNight: 18000,
        currency: "INR",
        image: "/modern-hotel-room.png",
        amenities: [
            "WiFi",
            "Breakfast Included",
            "City Center"
        ],
        description: "Comfortable hotel in the heart of Singapore.",
        policyCompliant: true,
        requiresNationality: true,
        requiresGST: false,
        rooms: [
            {
                id: "r10-4",
                type: "Standard Room",
                description: "King or Twin beds, 25 sqm",
                maxOccupancy: 2,
                pricePerNight: 18000,
                available: true,
                boardBasis: [
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 0
                    }
                ],
                cancellationPolicy: "Free cancellation until 24 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Breakfast"
                ]
            }
        ]
    },
    // London Hotels
    {
        id: "h11",
        name: "The Savoy London",
        location: "london",
        rating: 5,
        pricePerNight: 55000,
        currency: "INR",
        image: "/luxury-lobby.jpg",
        amenities: [
            "WiFi",
            "Spa",
            "Historic Building",
            "Fine Dining",
            "Thames View"
        ],
        description: "Iconic luxury hotel on the banks of the River Thames.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: false,
        minAge: 18,
        rooms: [
            {
                id: "r11-1",
                type: "Deluxe Room",
                description: "King bed, Thames view, 35 sqm",
                maxOccupancy: 2,
                pricePerNight: 55000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 7000
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 12000
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 18000
                    }
                ],
                cancellationPolicy: "Free cancellation until 14 days before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar",
                    "Butler Service"
                ]
            }
        ]
    },
    {
        id: "h11-2",
        name: "The Ritz London",
        location: "london",
        rating: 5,
        pricePerNight: 60000,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Afternoon Tea",
            "Historic Building",
            "Fine Dining",
            "Park View"
        ],
        description: "Legendary luxury hotel overlooking Green Park.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: false,
        minAge: 18,
        rooms: [
            {
                id: "r11-2",
                type: "Superior Room",
                description: "King bed, Park view, 38 sqm",
                maxOccupancy: 2,
                pricePerNight: 60000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 8000
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 13000
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 20000
                    }
                ],
                cancellationPolicy: "Free cancellation until 14 days before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar",
                    "Afternoon Tea"
                ]
            }
        ]
    },
    {
        id: "h11-3",
        name: "Premier Inn London",
        location: "london",
        rating: 4,
        pricePerNight: 25000,
        currency: "INR",
        image: "/modern-hotel-room.png",
        amenities: [
            "WiFi",
            "Breakfast Available",
            "City Center"
        ],
        description: "Comfortable hotel in central London.",
        policyCompliant: true,
        requiresNationality: true,
        requiresGST: false,
        rooms: [
            {
                id: "r11-3",
                type: "Standard Room",
                description: "King or Twin beds, 20 sqm",
                maxOccupancy: 2,
                pricePerNight: 25000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 3000
                    }
                ],
                cancellationPolicy: "Free cancellation until 24 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV"
                ]
            }
        ]
    },
    // Bangkok Hotels
    {
        id: "h12",
        name: "The Peninsula Bangkok",
        location: "bangkok",
        rating: 5,
        pricePerNight: 28000,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "River View",
            "Fine Dining"
        ],
        description: "Luxury hotel on the banks of the Chao Phraya River.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: false,
        minAge: 18,
        rooms: [
            {
                id: "r12-1",
                type: "River View Room",
                description: "King bed, River view, 40 sqm",
                maxOccupancy: 2,
                pricePerNight: 28000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 3500
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 6000
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 9000
                    }
                ],
                cancellationPolicy: "Free cancellation until 48 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            }
        ]
    },
    {
        id: "h12-2",
        name: "Mandarin Oriental Bangkok",
        location: "bangkok",
        rating: 5,
        pricePerNight: 32000,
        currency: "INR",
        image: "/luxury-lobby.jpg",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "River View",
            "Historic"
        ],
        description: "Historic luxury hotel with legendary service.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: false,
        minAge: 18,
        rooms: [
            {
                id: "r12-2",
                type: "Deluxe Room",
                description: "King bed, River view, 45 sqm",
                maxOccupancy: 2,
                pricePerNight: 32000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 4000
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 6500
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 10000
                    }
                ],
                cancellationPolicy: "Free cancellation until 7 days before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            }
        ]
    },
    {
        id: "h12-3",
        name: "Novotel Bangkok",
        location: "bangkok",
        rating: 4,
        pricePerNight: 15000,
        currency: "INR",
        image: "/modern-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Gym",
            "Restaurant"
        ],
        description: "Modern hotel in the heart of Bangkok.",
        policyCompliant: true,
        requiresNationality: true,
        requiresGST: false,
        rooms: [
            {
                id: "r12-3",
                type: "Superior Room",
                description: "King bed, City view, 30 sqm",
                maxOccupancy: 2,
                pricePerNight: 15000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 2000
                    }
                ],
                cancellationPolicy: "Free cancellation until 24 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV"
                ]
            }
        ]
    },
    // Jeddah Hotels
    {
        id: "h13",
        name: "The Ritz-Carlton Jeddah",
        location: "jeddah",
        rating: 5,
        pricePerNight: 32000,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Beach Access",
            "Fine Dining"
        ],
        description: "Luxury beachfront hotel with stunning Red Sea views.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: false,
        minAge: 18,
        rooms: [
            {
                id: "r13-1",
                type: "Sea View Room",
                description: "King bed, Red Sea view, 45 sqm",
                maxOccupancy: 2,
                pricePerNight: 32000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 4500
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 7500
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 11000
                    }
                ],
                cancellationPolicy: "Free cancellation until 48 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            }
        ]
    },
    {
        id: "h13-2",
        name: "Hilton Jeddah",
        location: "jeddah",
        rating: 5,
        pricePerNight: 28000,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Business Center",
            "Multiple Restaurants"
        ],
        description: "Luxury business hotel in the heart of Jeddah.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: false,
        minAge: 18,
        rooms: [
            {
                id: "r13-2",
                type: "Executive Room",
                description: "King bed, City view, 42 sqm",
                maxOccupancy: 2,
                pricePerNight: 28000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 4000
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 6500
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 9500
                    }
                ],
                cancellationPolicy: "Free cancellation until 48 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            }
        ]
    },
    {
        id: "h13-3",
        name: "Radisson Blu Jeddah",
        location: "jeddah",
        rating: 4,
        pricePerNight: 18000,
        currency: "INR",
        image: "/modern-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Gym",
            "Restaurant",
            "Business Center"
        ],
        description: "Modern hotel with excellent facilities and Red Sea proximity.",
        policyCompliant: true,
        requiresNationality: true,
        requiresGST: false,
        rooms: [
            {
                id: "r13-3",
                type: "Superior Room",
                description: "King bed, City view, 35 sqm",
                maxOccupancy: 2,
                pricePerNight: 18000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 2500
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 4500
                    }
                ],
                cancellationPolicy: "Free cancellation until 24 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            }
        ]
    },
    {
        id: "h13-4",
        name: "Holiday Inn Jeddah",
        location: "jeddah",
        rating: 4,
        pricePerNight: 15000,
        currency: "INR",
        image: "/modern-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Gym",
            "Restaurant"
        ],
        description: "Comfortable hotel perfect for business and leisure travelers.",
        policyCompliant: true,
        requiresNationality: true,
        requiresGST: false,
        rooms: [
            {
                id: "r13-4",
                type: "Standard Room",
                description: "King or Twin beds, 30 sqm",
                maxOccupancy: 2,
                pricePerNight: 15000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 2000
                    }
                ],
                cancellationPolicy: "Free cancellation until 24 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV"
                ]
            }
        ]
    },
    // Riyadh Hotels
    {
        id: "h14",
        name: "The Ritz-Carlton Riyadh",
        location: "riyadh",
        rating: 5,
        pricePerNight: 35000,
        currency: "INR",
        image: "/luxury-lobby.jpg",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Palace Architecture",
            "Fine Dining"
        ],
        description: "Luxury palace hotel set in a former royal residence.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: false,
        minAge: 18,
        rooms: [
            {
                id: "r14-1",
                type: "Palace Room",
                description: "King bed, Palace view, 50 sqm",
                maxOccupancy: 2,
                pricePerNight: 35000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 5000
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 8000
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 12000
                    }
                ],
                cancellationPolicy: "Free cancellation until 7 days before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar",
                    "Butler Service"
                ]
            }
        ]
    },
    {
        id: "h14-2",
        name: "Four Seasons Hotel Riyadh",
        location: "riyadh",
        rating: 5,
        pricePerNight: 38000,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Business Center",
            "Fine Dining"
        ],
        description: "Ultra-luxury hotel in the Kingdom Centre.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: false,
        minAge: 18,
        rooms: [
            {
                id: "r14-2",
                type: "Premier Room",
                description: "King bed, City view, 48 sqm",
                maxOccupancy: 2,
                pricePerNight: 38000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 5500
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 9000
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 13000
                    }
                ],
                cancellationPolicy: "Free cancellation until 7 days before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            }
        ]
    },
    {
        id: "h14-3",
        name: "Hilton Riyadh",
        location: "riyadh",
        rating: 5,
        pricePerNight: 30000,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Business Center",
            "Multiple Restaurants"
        ],
        description: "Luxury business hotel in the diplomatic quarter.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: false,
        minAge: 18,
        rooms: [
            {
                id: "r14-3",
                type: "Executive Room",
                description: "King bed, City view, 42 sqm",
                maxOccupancy: 2,
                pricePerNight: 30000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 4200
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 7000
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 10000
                    }
                ],
                cancellationPolicy: "Free cancellation until 48 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            }
        ]
    },
    {
        id: "h14-4",
        name: "Marriott Riyadh",
        location: "riyadh",
        rating: 4,
        pricePerNight: 20000,
        currency: "INR",
        image: "/modern-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Gym",
            "Restaurant",
            "Business Center"
        ],
        description: "Modern hotel with excellent business facilities.",
        policyCompliant: true,
        requiresNationality: true,
        requiresGST: false,
        rooms: [
            {
                id: "r14-4",
                type: "Superior Room",
                description: "King bed, 35 sqm",
                maxOccupancy: 2,
                pricePerNight: 20000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 2800
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 5000
                    }
                ],
                cancellationPolicy: "Free cancellation until 24 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            }
        ]
    },
    // Doha Hotels
    {
        id: "h15",
        name: "The Ritz-Carlton Doha",
        location: "doha",
        rating: 5,
        pricePerNight: 33000,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Beach Access",
            "Fine Dining"
        ],
        description: "Luxury beachfront hotel with stunning Arabian Gulf views.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: false,
        minAge: 18,
        rooms: [
            {
                id: "r15-1",
                type: "Gulf View Room",
                description: "King bed, Gulf view, 45 sqm",
                maxOccupancy: 2,
                pricePerNight: 33000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 4600
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 7700
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 11000
                    }
                ],
                cancellationPolicy: "Free cancellation until 48 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            }
        ]
    },
    {
        id: "h15-2",
        name: "Four Seasons Hotel Doha",
        location: "doha",
        rating: 5,
        pricePerNight: 36000,
        currency: "INR",
        image: "/luxury-lobby.jpg",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Beach Access",
            "Multiple Restaurants"
        ],
        description: "Ultra-luxury hotel on the Corniche with private beach.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: false,
        minAge: 18,
        rooms: [
            {
                id: "r15-2",
                type: "Deluxe Room",
                description: "King bed, Sea view, 48 sqm",
                maxOccupancy: 2,
                pricePerNight: 36000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 5000
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 8500
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 12000
                    }
                ],
                cancellationPolicy: "Free cancellation until 7 days before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            }
        ]
    },
    {
        id: "h15-3",
        name: "Hilton Doha",
        location: "doha",
        rating: 5,
        pricePerNight: 29000,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Business Center",
            "Fine Dining"
        ],
        description: "Luxury hotel in West Bay with modern amenities.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: false,
        minAge: 18,
        rooms: [
            {
                id: "r15-3",
                type: "Executive Room",
                description: "King bed, City view, 42 sqm",
                maxOccupancy: 2,
                pricePerNight: 29000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 4100
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 6800
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 9800
                    }
                ],
                cancellationPolicy: "Free cancellation until 48 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            }
        ]
    },
    {
        id: "h15-4",
        name: "Holiday Inn Doha",
        location: "doha",
        rating: 4,
        pricePerNight: 16000,
        currency: "INR",
        image: "/modern-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Gym",
            "Restaurant"
        ],
        description: "Comfortable hotel perfect for business travelers.",
        policyCompliant: true,
        requiresNationality: true,
        requiresGST: false,
        rooms: [
            {
                id: "r15-4",
                type: "Standard Room",
                description: "King or Twin beds, 30 sqm",
                maxOccupancy: 2,
                pricePerNight: 16000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 2200
                    }
                ],
                cancellationPolicy: "Free cancellation until 24 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV"
                ]
            }
        ]
    },
    // Abu Dhabi Hotels
    {
        id: "h16",
        name: "Emirates Palace Abu Dhabi",
        location: "abu-dhabi",
        rating: 5,
        pricePerNight: 40000,
        currency: "INR",
        image: "/luxury-lobby.jpg",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Private Beach",
            "Palace Architecture"
        ],
        description: "Iconic palace hotel with gold-plated interiors and private beach.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: false,
        minAge: 18,
        rooms: [
            {
                id: "r16-1",
                type: "Palace Room",
                description: "King bed, Sea view, 55 sqm",
                maxOccupancy: 2,
                pricePerNight: 40000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 6000
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 10000
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 15000
                    }
                ],
                cancellationPolicy: "Free cancellation until 14 days before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar",
                    "Butler Service",
                    "Beach Access"
                ]
            }
        ]
    },
    {
        id: "h16-2",
        name: "The St. Regis Abu Dhabi",
        location: "abu-dhabi",
        rating: 5,
        pricePerNight: 37000,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Beach Access",
            "Fine Dining"
        ],
        description: "Luxury hotel on the Corniche with butler service.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: false,
        minAge: 18,
        rooms: [
            {
                id: "r16-2",
                type: "Deluxe Room",
                description: "King bed, Gulf view, 48 sqm",
                maxOccupancy: 2,
                pricePerNight: 37000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 5200
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 8800
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 12500
                    }
                ],
                cancellationPolicy: "Free cancellation until 7 days before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar",
                    "Butler Service"
                ]
            }
        ]
    },
    {
        id: "h16-3",
        name: "Hilton Abu Dhabi",
        location: "abu-dhabi",
        rating: 5,
        pricePerNight: 31000,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Business Center",
            "Multiple Restaurants"
        ],
        description: "Luxury hotel in the heart of Abu Dhabi.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: false,
        minAge: 18,
        rooms: [
            {
                id: "r16-3",
                type: "Executive Room",
                description: "King bed, City view, 42 sqm",
                maxOccupancy: 2,
                pricePerNight: 31000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 4400
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 7300
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 10500
                    }
                ],
                cancellationPolicy: "Free cancellation until 48 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            }
        ]
    },
    {
        id: "h16-4",
        name: "Holiday Inn Abu Dhabi",
        location: "abu-dhabi",
        rating: 4,
        pricePerNight: 17000,
        currency: "INR",
        image: "/modern-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Gym",
            "Restaurant"
        ],
        description: "Comfortable hotel with modern amenities.",
        policyCompliant: true,
        requiresNationality: true,
        requiresGST: false,
        rooms: [
            {
                id: "r16-4",
                type: "Standard Room",
                description: "King or Twin beds, 30 sqm",
                maxOccupancy: 2,
                pricePerNight: 17000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 2300
                    }
                ],
                cancellationPolicy: "Free cancellation until 24 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV"
                ]
            }
        ]
    },
    // Muscat Hotels
    {
        id: "h17",
        name: "The Chedi Muscat",
        location: "muscat",
        rating: 5,
        pricePerNight: 26000,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Beach Access",
            "Fine Dining"
        ],
        description: "Luxury beachfront resort with minimalist design.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: false,
        minAge: 18,
        rooms: [
            {
                id: "r17-1",
                type: "Beach Villa",
                description: "King bed, Beach view, 50 sqm",
                maxOccupancy: 2,
                pricePerNight: 26000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 3500
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 6000
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 9000
                    }
                ],
                cancellationPolicy: "Free cancellation until 48 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            }
        ]
    },
    {
        id: "h17-2",
        name: "Shangri-La Muscat",
        location: "muscat",
        rating: 5,
        pricePerNight: 30000,
        currency: "INR",
        image: "/luxury-lobby.jpg",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Beach Access",
            "Multiple Restaurants"
        ],
        description: "Luxury resort with private beach and mountain views.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: false,
        minAge: 18,
        rooms: [
            {
                id: "r17-2",
                type: "Mountain View Room",
                description: "King bed, Mountain view, 45 sqm",
                maxOccupancy: 2,
                pricePerNight: 30000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 4200
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 7000
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 10000
                    }
                ],
                cancellationPolicy: "Free cancellation until 48 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            }
        ]
    },
    {
        id: "h17-3",
        name: "Holiday Inn Muscat",
        location: "muscat",
        rating: 4,
        pricePerNight: 14000,
        currency: "INR",
        image: "/modern-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Gym",
            "Restaurant"
        ],
        description: "Comfortable hotel perfect for business travelers.",
        policyCompliant: true,
        requiresNationality: true,
        requiresGST: false,
        rooms: [
            {
                id: "r17-3",
                type: "Standard Room",
                description: "King or Twin beds, 30 sqm",
                maxOccupancy: 2,
                pricePerNight: 14000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 1900
                    }
                ],
                cancellationPolicy: "Free cancellation until 24 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV"
                ]
            }
        ]
    },
    // More National Cities - Jaipur
    {
        id: "h18",
        name: "The Oberoi Rajvilas Jaipur",
        location: "jaipur",
        rating: 5,
        pricePerNight: 25000,
        currency: "INR",
        image: "/luxury-lobby.jpg",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Palace Architecture",
            "Gardens"
        ],
        description: "Luxury palace resort set in 32 acres of gardens.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: true,
        minAge: 18,
        rooms: [
            {
                id: "r18-1",
                type: "Villa with Private Pool",
                description: "King bed, Garden view, Private pool, 80 sqm",
                maxOccupancy: 2,
                pricePerNight: 25000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 3500
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 6000
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 8500
                    }
                ],
                cancellationPolicy: "Free cancellation until 7 days before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar",
                    "Private Pool"
                ]
            }
        ]
    },
    {
        id: "h18-2",
        name: "Taj Rambagh Palace Jaipur",
        location: "jaipur",
        rating: 5,
        pricePerNight: 22000,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Historic Palace",
            "Fine Dining"
        ],
        description: "Former royal residence converted into luxury hotel.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: true,
        minAge: 18,
        rooms: [
            {
                id: "r18-2",
                type: "Palace Room",
                description: "King bed, Palace view, 50 sqm",
                maxOccupancy: 2,
                pricePerNight: 22000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 3000
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 5000
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 7000
                    }
                ],
                cancellationPolicy: "Free cancellation until 7 days before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            }
        ]
    },
    {
        id: "h18-3",
        name: "Holiday Inn Jaipur",
        location: "jaipur",
        rating: 4,
        pricePerNight: 9000,
        currency: "INR",
        image: "/modern-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Gym",
            "Restaurant"
        ],
        description: "Comfortable hotel perfect for exploring the Pink City.",
        policyCompliant: true,
        requiresNationality: false,
        requiresGST: false,
        rooms: [
            {
                id: "r18-3",
                type: "Standard Room",
                description: "King or Twin beds, 28 sqm",
                maxOccupancy: 2,
                pricePerNight: 9000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 1500
                    }
                ],
                cancellationPolicy: "Free cancellation until 24 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV"
                ]
            }
        ]
    },
    // Udaipur Hotels
    {
        id: "h19",
        name: "The Oberoi Udaivilas Udaipur",
        location: "udaipur",
        rating: 5,
        pricePerNight: 28000,
        currency: "INR",
        image: "/luxury-lobby.jpg",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Lake View",
            "Palace Architecture"
        ],
        description: "Luxury palace hotel overlooking Lake Pichola.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: true,
        minAge: 18,
        rooms: [
            {
                id: "r19-1",
                type: "Lake View Suite",
                description: "King bed, Lake view, 60 sqm",
                maxOccupancy: 2,
                pricePerNight: 28000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 4000
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 6500
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 9000
                    }
                ],
                cancellationPolicy: "Free cancellation until 7 days before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar",
                    "Butler Service"
                ]
            }
        ]
    },
    {
        id: "h19-2",
        name: "Taj Lake Palace Udaipur",
        location: "udaipur",
        rating: 5,
        pricePerNight: 35000,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Floating Palace",
            "Boat Transfer"
        ],
        description: "Iconic floating palace hotel in the middle of Lake Pichola.",
        policyCompliant: false,
        requiresNationality: true,
        requiresGST: true,
        minAge: 18,
        rooms: [
            {
                id: "r19-2",
                type: "Palace Room",
                description: "King bed, Lake view, 55 sqm",
                maxOccupancy: 2,
                pricePerNight: 35000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 5000
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 8000
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 12000
                    }
                ],
                cancellationPolicy: "Free cancellation until 14 days before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar",
                    "Boat Transfer"
                ]
            }
        ]
    },
    {
        id: "h19-3",
        name: "Radisson Blu Udaipur",
        location: "udaipur",
        rating: 4,
        pricePerNight: 11000,
        currency: "INR",
        image: "/modern-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Gym",
            "Restaurant",
            "Lake View"
        ],
        description: "Modern hotel with views of the Aravalli Hills.",
        policyCompliant: true,
        requiresNationality: false,
        requiresGST: false,
        rooms: [
            {
                id: "r19-3",
                type: "Superior Room",
                description: "King bed, Hill view, 32 sqm",
                maxOccupancy: 2,
                pricePerNight: 11000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 1700
                    }
                ],
                cancellationPolicy: "Free cancellation until 24 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV"
                ]
            }
        ]
    },
    // Kochi Hotels
    {
        id: "h20",
        name: "Taj Malabar Kochi",
        location: "kochi",
        rating: 5,
        pricePerNight: 16000,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Harbor View",
            "Heritage"
        ],
        description: "Luxury heritage hotel overlooking the harbor.",
        policyCompliant: true,
        requiresNationality: true,
        requiresGST: true,
        minAge: 18,
        rooms: [
            {
                id: "r20-1",
                type: "Harbor View Room",
                description: "King bed, Harbor view, 40 sqm",
                maxOccupancy: 2,
                pricePerNight: 16000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 2300
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 3800
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 5500
                    }
                ],
                cancellationPolicy: "Free cancellation until 48 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            }
        ]
    },
    {
        id: "h20-2",
        name: "Grand Hyatt Kochi",
        location: "kochi",
        rating: 5,
        pricePerNight: 18000,
        currency: "INR",
        image: "/luxury-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Spa",
            "Business Center",
            "Multiple Restaurants"
        ],
        description: "Luxury hotel in the heart of Kochi.",
        policyCompliant: true,
        requiresNationality: true,
        requiresGST: true,
        minAge: 18,
        rooms: [
            {
                id: "r20-2",
                type: "Executive Room",
                description: "King bed, City view, 42 sqm",
                maxOccupancy: 2,
                pricePerNight: 18000,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 2600
                    },
                    {
                        id: "hb",
                        name: "Half Board",
                        price: 4200
                    },
                    {
                        id: "fb",
                        name: "Full Board",
                        price: 6000
                    }
                ],
                cancellationPolicy: "Free cancellation until 48 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV",
                    "Mini Bar"
                ]
            }
        ]
    },
    {
        id: "h20-3",
        name: "Holiday Inn Kochi",
        location: "kochi",
        rating: 4,
        pricePerNight: 8500,
        currency: "INR",
        image: "/modern-hotel-room.png",
        amenities: [
            "WiFi",
            "Pool",
            "Gym",
            "Restaurant"
        ],
        description: "Comfortable hotel perfect for business travelers.",
        policyCompliant: true,
        requiresNationality: false,
        requiresGST: false,
        rooms: [
            {
                id: "r20-3",
                type: "Standard Room",
                description: "King or Twin beds, 28 sqm",
                maxOccupancy: 2,
                pricePerNight: 8500,
                available: true,
                boardBasis: [
                    {
                        id: "ro",
                        name: "Room Only",
                        price: 0
                    },
                    {
                        id: "bb",
                        name: "Bed & Breakfast",
                        price: 1400
                    }
                ],
                cancellationPolicy: "Free cancellation until 24 hours before check-in",
                inclusions: [
                    "WiFi",
                    "Air Conditioning",
                    "TV"
                ]
            }
        ]
    }
];
const MOCK_FLIGHTS = [
    // Delhi to Mumbai routes
    {
        id: "f1",
        airline: "Indigo",
        airlineLogo: "/indigo-logo.jpg",
        flightNumber: "6E-554",
        departure: {
            code: "DEL",
            city: "New Delhi",
            time: "2024-06-15T08:00:00"
        },
        arrival: {
            code: "BOM",
            city: "Mumbai",
            time: "2024-06-15T10:15:00"
        },
        duration: "2h 15m",
        price: 10000,
        currency: "INR",
        policyCompliant: true,
        stops: 0,
        baggage: "15kg"
    },
    {
        id: "f2",
        airline: "Air India",
        airlineLogo: "/air-india-logo.jpg",
        flightNumber: "AI-887",
        departure: {
            code: "DEL",
            city: "New Delhi",
            time: "2024-06-15T09:30:00"
        },
        arrival: {
            code: "BOM",
            city: "Mumbai",
            time: "2024-06-15T11:45:00"
        },
        duration: "2h 15m",
        price: 12000,
        currency: "INR",
        policyCompliant: true,
        stops: 0,
        baggage: "20kg"
    },
    {
        id: "f3",
        airline: "Vistara",
        airlineLogo: "/vistara-logo.jpg",
        flightNumber: "UK-994",
        departure: {
            code: "DEL",
            city: "New Delhi",
            time: "2024-06-15T14:00:00"
        },
        arrival: {
            code: "BOM",
            city: "Mumbai",
            time: "2024-06-15T16:10:00"
        },
        duration: "2h 10m",
        price: 17500,
        currency: "INR",
        policyCompliant: false,
        stops: 0,
        baggage: "30kg"
    },
    {
        id: "f4",
        airline: "Indigo",
        airlineLogo: "/indigo-logo.jpg",
        flightNumber: "6E-612",
        departure: {
            code: "DEL",
            city: "New Delhi",
            time: "2024-06-15T06:30:00"
        },
        arrival: {
            code: "BOM",
            city: "Mumbai",
            time: "2024-06-15T08:45:00"
        },
        duration: "2h 15m",
        price: 9500,
        currency: "INR",
        policyCompliant: true,
        stops: 0,
        baggage: "15kg"
    },
    {
        id: "f5",
        airline: "SpiceJet",
        airlineLogo: "/placeholder-logo.svg",
        flightNumber: "SG-234",
        departure: {
            code: "DEL",
            city: "New Delhi",
            time: "2024-06-15T11:00:00"
        },
        arrival: {
            code: "BOM",
            city: "Mumbai",
            time: "2024-06-15T13:20:00"
        },
        duration: "2h 20m",
        price: 8800,
        currency: "INR",
        policyCompliant: true,
        stops: 0,
        baggage: "No baggage"
    },
    {
        id: "f6",
        airline: "Go First",
        airlineLogo: "/placeholder-logo.svg",
        flightNumber: "G8-456",
        departure: {
            code: "DEL",
            city: "New Delhi",
            time: "2024-06-15T16:30:00"
        },
        arrival: {
            code: "BOM",
            city: "Mumbai",
            time: "2024-06-15T18:50:00"
        },
        duration: "2h 20m",
        price: 9200,
        currency: "INR",
        policyCompliant: true,
        stops: 0,
        baggage: "15kg"
    },
    // Delhi to Bangalore routes
    {
        id: "f7",
        airline: "Indigo",
        airlineLogo: "/indigo-logo.jpg",
        flightNumber: "6E-789",
        departure: {
            code: "DEL",
            city: "New Delhi",
            time: "2024-06-15T07:00:00"
        },
        arrival: {
            code: "BLR",
            city: "Bangalore",
            time: "2024-06-15T09:45:00"
        },
        duration: "2h 45m",
        price: 11000,
        currency: "INR",
        policyCompliant: true,
        stops: 0,
        baggage: "15kg"
    },
    {
        id: "f8",
        airline: "Air India",
        airlineLogo: "/air-india-logo.jpg",
        flightNumber: "AI-512",
        departure: {
            code: "DEL",
            city: "New Delhi",
            time: "2024-06-15T10:00:00"
        },
        arrival: {
            code: "BLR",
            city: "Bangalore",
            time: "2024-06-15T12:50:00"
        },
        duration: "2h 50m",
        price: 13000,
        currency: "INR",
        policyCompliant: true,
        stops: 0,
        baggage: "20kg"
    },
    {
        id: "f9",
        airline: "Vistara",
        airlineLogo: "/vistara-logo.jpg",
        flightNumber: "UK-823",
        departure: {
            code: "DEL",
            city: "New Delhi",
            time: "2024-06-15T15:30:00"
        },
        arrival: {
            code: "BLR",
            city: "Bangalore",
            time: "2024-06-15T18:15:00"
        },
        duration: "2h 45m",
        price: 16000,
        currency: "INR",
        policyCompliant: true,
        stops: 0,
        baggage: "25kg"
    },
    // Mumbai to Bangalore routes
    {
        id: "f10",
        airline: "Indigo",
        airlineLogo: "/indigo-logo.jpg",
        flightNumber: "6E-345",
        departure: {
            code: "BOM",
            city: "Mumbai",
            time: "2024-06-15T08:30:00"
        },
        arrival: {
            code: "BLR",
            city: "Bangalore",
            time: "2024-06-15T10:00:00"
        },
        duration: "1h 30m",
        price: 7500,
        currency: "INR",
        policyCompliant: true,
        stops: 0,
        baggage: "15kg"
    },
    {
        id: "f11",
        airline: "SpiceJet",
        airlineLogo: "/placeholder-logo.svg",
        flightNumber: "SG-567",
        departure: {
            code: "BOM",
            city: "Mumbai",
            time: "2024-06-15T12:00:00"
        },
        arrival: {
            code: "BLR",
            city: "Bangalore",
            time: "2024-06-15T13:35:00"
        },
        duration: "1h 35m",
        price: 7200,
        currency: "INR",
        policyCompliant: true,
        stops: 0,
        baggage: "No baggage"
    },
    // Delhi to Chennai routes
    {
        id: "f12",
        airline: "Indigo",
        airlineLogo: "/indigo-logo.jpg",
        flightNumber: "6E-901",
        departure: {
            code: "DEL",
            city: "New Delhi",
            time: "2024-06-15T09:00:00"
        },
        arrival: {
            code: "MAA",
            city: "Chennai",
            time: "2024-06-15T11:30:00"
        },
        duration: "2h 30m",
        price: 10500,
        currency: "INR",
        policyCompliant: true,
        stops: 0,
        baggage: "15kg"
    },
    {
        id: "f13",
        airline: "Air India",
        airlineLogo: "/air-india-logo.jpg",
        flightNumber: "AI-678",
        departure: {
            code: "DEL",
            city: "New Delhi",
            time: "2024-06-15T13:00:00"
        },
        arrival: {
            code: "MAA",
            city: "Chennai",
            time: "2024-06-15T15:40:00"
        },
        duration: "2h 40m",
        price: 12500,
        currency: "INR",
        policyCompliant: true,
        stops: 0,
        baggage: "20kg"
    },
    // Mumbai to Chennai routes
    {
        id: "f14",
        airline: "Indigo",
        airlineLogo: "/indigo-logo.jpg",
        flightNumber: "6E-234",
        departure: {
            code: "BOM",
            city: "Mumbai",
            time: "2024-06-15T10:00:00"
        },
        arrival: {
            code: "MAA",
            city: "Chennai",
            time: "2024-06-15T11:45:00"
        },
        duration: "1h 45m",
        price: 8000,
        currency: "INR",
        policyCompliant: true,
        stops: 0,
        baggage: "15kg"
    },
    // Routes with stops
    {
        id: "f15",
        airline: "SpiceJet",
        airlineLogo: "/placeholder-logo.svg",
        flightNumber: "SG-890",
        departure: {
            code: "DEL",
            city: "New Delhi",
            time: "2024-06-15T08:00:00"
        },
        arrival: {
            code: "BLR",
            city: "Bangalore",
            time: "2024-06-15T12:30:00"
        },
        duration: "4h 30m",
        price: 8500,
        currency: "INR",
        policyCompliant: true,
        stops: 1,
        baggage: "No baggage"
    },
    {
        id: "f16",
        airline: "Go First",
        airlineLogo: "/placeholder-logo.svg",
        flightNumber: "G8-123",
        departure: {
            code: "BOM",
            city: "Mumbai",
            time: "2024-06-15T14:00:00"
        },
        arrival: {
            code: "MAA",
            city: "Chennai",
            time: "2024-06-15T17:20:00"
        },
        duration: "3h 20m",
        price: 7800,
        currency: "INR",
        policyCompliant: true,
        stops: 1,
        baggage: "15kg"
    },
    // Premium/Business class options
    {
        id: "f17",
        airline: "Vistara",
        airlineLogo: "/vistara-logo.jpg",
        flightNumber: "UK-456",
        departure: {
            code: "DEL",
            city: "New Delhi",
            time: "2024-06-15T11:00:00"
        },
        arrival: {
            code: "BOM",
            city: "Mumbai",
            time: "2024-06-15T13:10:00"
        },
        duration: "2h 10m",
        price: 25000,
        currency: "INR",
        policyCompliant: false,
        stops: 0,
        baggage: "30kg"
    },
    {
        id: "f18",
        airline: "Air India",
        airlineLogo: "/air-india-logo.jpg",
        flightNumber: "AI-999",
        departure: {
            code: "DEL",
            city: "New Delhi",
            time: "2024-06-15T16:00:00"
        },
        arrival: {
            code: "BLR",
            city: "Bangalore",
            time: "2024-06-15T18:45:00"
        },
        duration: "2h 45m",
        price: 22000,
        currency: "INR",
        policyCompliant: false,
        stops: 0,
        baggage: "25kg"
    },
    // International routes
    {
        id: "f19",
        airline: "Air India",
        airlineLogo: "/air-india-logo.jpg",
        flightNumber: "AI-101",
        departure: {
            code: "DEL",
            city: "New Delhi",
            time: "2024-06-20T01:45:00"
        },
        arrival: {
            code: "LHR",
            city: "London Heathrow",
            time: "2024-06-20T07:15:00"
        },
        duration: "9h 30m",
        price: 52000,
        currency: "INR",
        policyCompliant: false,
        stops: 0,
        type: "INTERNATIONAL",
        baggage: "30kg"
    },
    {
        id: "f20",
        airline: "Emirates",
        airlineLogo: "/placeholder-logo.svg",
        flightNumber: "EK-507",
        departure: {
            code: "BOM",
            city: "Mumbai",
            time: "2024-06-22T03:30:00"
        },
        arrival: {
            code: "DXB",
            city: "Dubai",
            time: "2024-06-22T05:00:00"
        },
        duration: "2h 30m",
        price: 28000,
        currency: "INR",
        policyCompliant: true,
        stops: 0,
        type: "INTERNATIONAL",
        baggage: "25kg"
    },
    {
        id: "f21",
        airline: "Singapore Airlines",
        airlineLogo: "/placeholder-logo.svg",
        flightNumber: "SQ-511",
        departure: {
            code: "BLR",
            city: "Bangalore",
            time: "2024-06-25T00:30:00"
        },
        arrival: {
            code: "SIN",
            city: "Singapore",
            time: "2024-06-25T07:10:00"
        },
        duration: "4h 10m",
        price: 36000,
        currency: "INR",
        policyCompliant: true,
        stops: 0,
        type: "INTERNATIONAL",
        baggage: "30kg"
    },
    {
        id: "f22",
        airline: "Qatar Airways",
        airlineLogo: "/placeholder-logo.svg",
        flightNumber: "QR-571",
        departure: {
            code: "DEL",
            city: "New Delhi",
            time: "2024-06-28T02:15:00"
        },
        arrival: {
            code: "DOH",
            city: "Doha",
            time: "2024-06-28T04:00:00"
        },
        duration: "3h 15m",
        price: 30000,
        currency: "INR",
        policyCompliant: true,
        stops: 0,
        type: "INTERNATIONAL",
        baggage: "25kg"
    },
    {
        id: "f23",
        airline: "Lufthansa",
        airlineLogo: "/placeholder-logo.svg",
        flightNumber: "LH-763",
        departure: {
            code: "DEL",
            city: "New Delhi",
            time: "2024-07-01T02:50:00"
        },
        arrival: {
            code: "FRA",
            city: "Frankfurt",
            time: "2024-07-01T08:45:00"
        },
        duration: "8h 25m",
        price: 48000,
        currency: "INR",
        policyCompliant: false,
        stops: 0,
        type: "INTERNATIONAL",
        baggage: "30kg"
    }
];
const MOCK_BOOKINGS = [
    {
        id: "b1",
        type: "FLIGHT",
        status: "CONFIRMED",
        details: MOCK_FLIGHTS[0],
        date: "2024-05-20",
        amount: 10000,
        agentName: "John Agent",
        agentId: "u3"
    },
    {
        id: "b2",
        type: "HOTEL",
        status: "PENDING_APPROVAL",
        details: MOCK_HOTELS[2],
        date: "2024-06-01",
        amount: 21000,
        agentName: "John Agent",
        agentId: "u3",
        approvalStatus: "PENDING"
    },
    {
        id: "b3",
        type: "FLIGHT",
        status: "REFUNDED",
        details: MOCK_FLIGHTS[1],
        date: "2024-04-10",
        amount: 12000,
        agentName: "Sarah Agency",
        agentId: "u2"
    }
];
const MOCK_STATS = {
    totalSpend: 125000,
    activeTravelers: 45,
    pendingApprovals: 8,
    policyViolations: 3
};
}),
"[project]/Downloads/travel-booking-platform/lib/store.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAppStore",
    ()=>useAppStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/lib/mock-data.ts [app-ssr] (ecmascript)");
;
;
const useAppStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((set)=>({
        currentUser: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOCK_USERS"][1],
        setCurrentUser: (user)=>set({
                currentUser: user
            }),
        setRole: (role)=>{
            const user = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOCK_USERS"].find((u)=>u.role === role);
            if (user) set({
                currentUser: user
            });
        },
        isLoading: false,
        setIsLoading: (loading)=>set({
                isLoading: loading
            }),
        // Support Mode Implementation
        isSupportMode: false,
        supportAgentName: null,
        setSupportMode: (active, agentName)=>set({
                isSupportMode: active,
                supportAgentName: agentName
            })
    }));
}),
"[project]/Downloads/travel-booking-platform/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "formatDate",
    ()=>formatDate,
    "getMarkupVisibility",
    ()=>getMarkupVisibility
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function formatDate(dateString) {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    // Use explicit format: DD/MM/YYYY to ensure consistency
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
function getMarkupVisibility() {
    if ("TURBOPACK compile-time truthy", 1) return true // Default to showing markup on server
    ;
    //TURBOPACK unreachable
    ;
    const stored = undefined;
}
}),
"[project]/Downloads/travel-booking-platform/components/ui/button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, variant, size, asChild = false, onClick, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        onClick: onClick,
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/button.tsx",
        lineNumber: 46,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
Button.displayName = "Button";
;
}),
"[project]/Downloads/travel-booking-platform/components/ui/alert-dialog.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertDialog",
    ()=>AlertDialog,
    "AlertDialogAction",
    ()=>AlertDialogAction,
    "AlertDialogCancel",
    ()=>AlertDialogCancel,
    "AlertDialogContent",
    ()=>AlertDialogContent,
    "AlertDialogDescription",
    ()=>AlertDialogDescription,
    "AlertDialogFooter",
    ()=>AlertDialogFooter,
    "AlertDialogHeader",
    ()=>AlertDialogHeader,
    "AlertDialogOverlay",
    ()=>AlertDialogOverlay,
    "AlertDialogPortal",
    ()=>AlertDialogPortal,
    "AlertDialogTitle",
    ()=>AlertDialogTitle,
    "AlertDialogTrigger",
    ()=>AlertDialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/@radix-ui/react-alert-dialog/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/components/ui/button.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function AlertDialog({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "alert-dialog",
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/alert-dialog.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
function AlertDialogTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "alert-dialog-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/alert-dialog.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
function AlertDialogPortal({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"], {
        "data-slot": "alert-dialog-portal",
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/alert-dialog.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
function AlertDialogOverlay({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Overlay"], {
        "data-slot": "alert-dialog-overlay",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/alert-dialog.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
function AlertDialogContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AlertDialogPortal, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AlertDialogOverlay, {}, void 0, false, {
                fileName: "[project]/Downloads/travel-booking-platform/components/ui/alert-dialog.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"], {
                "data-slot": "alert-dialog-content",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg', className),
                ...props
            }, void 0, false, {
                fileName: "[project]/Downloads/travel-booking-platform/components/ui/alert-dialog.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/alert-dialog.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
function AlertDialogHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "alert-dialog-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex flex-col gap-2 text-center sm:text-left', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/alert-dialog.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
function AlertDialogFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "alert-dialog-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/alert-dialog.tsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
function AlertDialogTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Title"], {
        "data-slot": "alert-dialog-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-lg font-semibold', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/alert-dialog.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, this);
}
function AlertDialogDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Description"], {
        "data-slot": "alert-dialog-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground text-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/alert-dialog.tsx",
        lineNumber: 113,
        columnNumber: 5
    }, this);
}
function AlertDialogAction({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Action"], {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buttonVariants"])(), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/alert-dialog.tsx",
        lineNumber: 126,
        columnNumber: 5
    }, this);
}
function AlertDialogCancel({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Cancel"], {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buttonVariants"])({
            variant: 'outline'
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/alert-dialog.tsx",
        lineNumber: 138,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/Downloads/travel-booking-platform/components/dashboard/session-timer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SessionTimer",
    ()=>SessionTimer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/lib/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/components/ui/alert-dialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
"use client";
;
;
;
;
;
;
// 30 minutes in milliseconds
const SESSION_TIMEOUT = 30 * 60 * 1000;
const WARNING_THRESHOLD = 2 * 60 * 1000 // 2 minutes before timeout
;
function SessionTimer() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { currentUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppStore"])();
    const [showWarning, setShowWarning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lastActivity, setLastActivity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(Date.now());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Reset timer on user activity
        const resetTimer = ()=>setLastActivity(Date.now());
        window.addEventListener("mousemove", resetTimer);
        window.addEventListener("keydown", resetTimer);
        window.addEventListener("click", resetTimer);
        // Check interval
        const interval = setInterval(()=>{
            const now = Date.now();
            const timeInactive = now - lastActivity;
            if (timeInactive >= SESSION_TIMEOUT) {
                // Logout
                localStorage.removeItem("session_user");
                router.push("/login");
            } else if (timeInactive >= SESSION_TIMEOUT - WARNING_THRESHOLD) {
                setShowWarning(true);
            } else {
                setShowWarning(false);
            }
        }, 1000);
        return ()=>{
            window.removeEventListener("mousemove", resetTimer);
            window.removeEventListener("keydown", resetTimer);
            window.removeEventListener("click", resetTimer);
            clearInterval(interval);
        };
    }, [
        lastActivity,
        router
    ]);
    const handleStayLoggedIn = ()=>{
        setLastActivity(Date.now());
        setShowWarning(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialog"], {
        open: showWarning,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogContent"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogTitle"], {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                    className: "w-5 h-5 text-orange-500"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/travel-booking-platform/components/dashboard/session-timer.tsx",
                                    lineNumber: 69,
                                    columnNumber: 13
                                }, this),
                                " Session Expiring"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/travel-booking-platform/components/dashboard/session-timer.tsx",
                            lineNumber: 68,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogDescription"], {
                            children: "Your session will expire in less than 2 minutes due to inactivity. Do you want to stay logged in?"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/travel-booking-platform/components/dashboard/session-timer.tsx",
                            lineNumber: 71,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/travel-booking-platform/components/dashboard/session-timer.tsx",
                    lineNumber: 67,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogFooter"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogAction"], {
                        onClick: handleStayLoggedIn,
                        children: "Stay Logged In"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/travel-booking-platform/components/dashboard/session-timer.tsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Downloads/travel-booking-platform/components/dashboard/session-timer.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/travel-booking-platform/components/dashboard/session-timer.tsx",
            lineNumber: 66,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/dashboard/session-timer.tsx",
        lineNumber: 65,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__64cfaf0b._.js.map