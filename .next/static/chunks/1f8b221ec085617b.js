(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,74630,e=>{"use strict";var a=e.i(3991),t=e.i(25832),s=e.i(75973),r=e.i(57156),i=e.i(17718),l=e.i(25705),n=e.i(86719),o=e.i(62712),d=e.i(1123),c=e.i(42597),m=e.i(30441),p=e.i(15441),u=e.i(90814),x=e.i(38141),g=e.i(71594),h=e.i(13842);let f=(0,h.default)("Minus",[["path",{d:"M5 12h14",key:"1ays0h"}]]),b=(0,h.default)("ArrowLeftRight",[["path",{d:"M8 3 4 7l4 4",key:"9rb6wj"}],["path",{d:"M4 7h16",key:"6tx8e3"}],["path",{d:"m16 21 4-4-4-4",key:"siv7j2"}],["path",{d:"M20 17H4",key:"h6l3hr"}]]);var v=e.i(17920),j=e.i(1299),N=e.i(2359),y=e.i(11241),w=e.i(28146),S=e.i(4689),k=e.i(1974),C=e.i(25677),P=t.forwardRef((e,t)=>{let{pressed:s,defaultPressed:r=!1,onPressedChange:i,...l}=e,[n=!1,o]=(0,C.useControllableState)({prop:s,onChange:i,defaultProp:r});return(0,a.jsx)(w.Primitive.button,{type:"button","aria-pressed":n,"data-state":n?"on":"off","data-disabled":e.disabled?"":void 0,...l,ref:t,onClick:(0,k.composeEventHandlers)(e.onClick,()=>{e.disabled||o(!n)})})});P.displayName="Toggle";var D=e.i(37009),I="ToggleGroup",[B,T]=(0,y.createContextScope)(I,[S.createRovingFocusGroupScope]),F=(0,S.createRovingFocusGroupScope)(),A=t.default.forwardRef((e,t)=>{let{type:s,...r}=e;if("single"===s)return(0,a.jsx)($,{...r,ref:t});if("multiple"===s)return(0,a.jsx)(M,{...r,ref:t});throw Error(`Missing prop \`type\` expected on \`${I}\``)});A.displayName=I;var[L,R]=B(I),$=t.default.forwardRef((e,s)=>{let{value:r,defaultValue:i,onValueChange:l=()=>{},...n}=e,[o,d]=(0,C.useControllableState)({prop:r,defaultProp:i,onChange:l});return(0,a.jsx)(L,{scope:e.__scopeToggleGroup,type:"single",value:o?[o]:[],onItemActivate:d,onItemDeactivate:t.default.useCallback(()=>d(""),[d]),children:(0,a.jsx)(O,{...n,ref:s})})}),M=t.default.forwardRef((e,s)=>{let{value:r,defaultValue:i,onValueChange:l=()=>{},...n}=e,[o=[],d]=(0,C.useControllableState)({prop:r,defaultProp:i,onChange:l}),c=t.default.useCallback(e=>d((a=[])=>[...a,e]),[d]),m=t.default.useCallback(e=>d((a=[])=>a.filter(a=>a!==e)),[d]);return(0,a.jsx)(L,{scope:e.__scopeToggleGroup,type:"multiple",value:o,onItemActivate:c,onItemDeactivate:m,children:(0,a.jsx)(O,{...n,ref:s})})});A.displayName=I;var[z,E]=B(I),O=t.default.forwardRef((e,t)=>{let{__scopeToggleGroup:s,disabled:r=!1,rovingFocus:i=!0,orientation:l,dir:n,loop:o=!0,...d}=e,c=F(s),m=(0,D.useDirection)(n),p={role:"group",dir:m,...d};return(0,a.jsx)(z,{scope:s,rovingFocus:i,disabled:r,children:i?(0,a.jsx)(S.Root,{asChild:!0,...c,orientation:l,dir:m,loop:o,children:(0,a.jsx)(w.Primitive.div,{...p,ref:t})}):(0,a.jsx)(w.Primitive.div,{...p,ref:t})})}),_="ToggleGroupItem",G=t.default.forwardRef((e,s)=>{let r=R(_,e.__scopeToggleGroup),i=E(_,e.__scopeToggleGroup),l=F(e.__scopeToggleGroup),n=r.value.includes(e.value),o=i.disabled||e.disabled,d={...e,pressed:n,disabled:o},c=t.default.useRef(null);return i.rovingFocus?(0,a.jsx)(S.Item,{asChild:!0,...l,focusable:!o,active:n,ref:c,children:(0,a.jsx)(q,{...d,ref:s})}):(0,a.jsx)(q,{...d,ref:s})});G.displayName=_;var q=t.default.forwardRef((e,t)=>{let{__scopeToggleGroup:s,value:r,...i}=e,l=R(_,s),n={role:"radio","aria-checked":e.pressed,"aria-pressed":void 0},o="single"===l.type?n:void 0;return(0,a.jsx)(P,{...o,...i,ref:t,onPressedChange:e=>{e?l.onItemActivate(r):l.onItemDeactivate(r)}})});let U=(0,e.i(74306).cva)("inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",{variants:{variant:{default:"bg-transparent",outline:"border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground"},size:{default:"h-9 px-2 min-w-9",sm:"h-8 px-1.5 min-w-8",lg:"h-10 px-2.5 min-w-10"}},defaultVariants:{variant:"default",size:"default"}}),H=t.createContext({size:"default",variant:"default"});function V({className:e,variant:t,size:s,children:r,...i}){return(0,a.jsx)(A,{"data-slot":"toggle-group","data-variant":t,"data-size":s,className:(0,j.cn)("group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs",e),...i,children:(0,a.jsx)(H.Provider,{value:{variant:t,size:s},children:r})})}function Y({className:e,children:s,variant:r,size:i,...l}){let n=t.useContext(H);return(0,a.jsx)(G,{"data-slot":"toggle-group-item","data-variant":n.variant||r,"data-size":n.size||i,className:(0,j.cn)(U({variant:n.variant||r,size:n.size||i}),"min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",e),...l,children:s})}var X=e.i(58696);let K=[{value:"DEL",label:"New Delhi (DEL)"},{value:"BOM",label:"Mumbai (BOM)"},{value:"BLR",label:"Bangalore (BLR)"},{value:"MAA",label:"Chennai (MAA)"},{value:"CCU",label:"Kolkata (CCU)"},{value:"HYD",label:"Hyderabad (HYD)"}],W=[...K,{value:"DXB",label:"Dubai (DXB)"},{value:"LHR",label:"London Heathrow (LHR)"},{value:"SIN",label:"Singapore (SIN)"},{value:"JFK",label:"New York (JFK)"},{value:"FRA",label:"Frankfurt (FRA)"},{value:"SYD",label:"Sydney (SYD)"}];function Z({tripType:e="one-way",origin:s="",destination:h="",departureDate:y=null,returnDate:w=null,travellers:S="1",class:k="Economy",specialFare:C="Regular",flightType:P="domestic",onTripTypeChange:D,onOriginChange:I,onDestinationChange:B,onDepartureDateChange:T,onReturnDateChange:F,onTravellersChange:A,onClassChange:L,onSpecialFareChange:R,onFlightTypeChange:$,onSearch:M,errors:z={}}){let[E,O]=(0,t.useState)(P);(0,t.useEffect)(()=>{let e=localStorage.getItem("flight_search_type");e&&(O(e),$?.(e))},[$]),(0,t.useEffect)(()=>{let e="domestic"===E?K:W;s&&!e.some(e=>e.value===s)&&I?.(""),h&&!e.some(e=>e.value===h)&&B?.("")},[E,s,h,I,B]);let _="domestic"===E?K:W,G=!s||!h,q=Math.max(1,parseInt(S||"1")||1),U=e.replace("-"," ");return(0,a.jsx)(i.Card,{className:"border-2 bg-gradient-to-br from-background via-background to-primary/5 p-5 md:p-6 shadow-lg",children:(0,a.jsxs)("div",{className:"grid gap-4",children:[(0,a.jsxs)("div",{className:"flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",children:[(0,a.jsxs)(o.RadioGroup,{value:e,onValueChange:D,className:"flex gap-4",children:[(0,a.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,a.jsx)(o.RadioGroupItem,{value:"one-way",id:"one-way"}),(0,a.jsx)(l.Label,{htmlFor:"one-way",className:"font-medium cursor-pointer",children:"One Way"})]}),(0,a.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,a.jsx)(o.RadioGroupItem,{value:"round-trip",id:"round-trip"}),(0,a.jsx)(l.Label,{htmlFor:"round-trip",className:"font-medium cursor-pointer",children:"Round Trip"})]}),(0,a.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,a.jsx)(o.RadioGroupItem,{value:"multi-city",id:"multi-city",disabled:!0}),(0,a.jsx)(l.Label,{htmlFor:"multi-city",className:"text-muted-foreground cursor-not-allowed",children:"Multi City"})]})]}),(0,a.jsxs)(V,{type:"single",value:E,onValueChange:e=>{("domestic"===e||"international"===e)&&(O(e),localStorage.setItem("flight_search_type",e),$?.(e))},className:"border-2",children:[(0,a.jsxs)(Y,{value:"domestic","aria-label":"Domestic",className:"data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",children:[(0,a.jsx)(x.MapPin,{className:"mr-2 h-4 w-4"}),"Domestic"]}),(0,a.jsxs)(Y,{value:"international","aria-label":"International",className:"data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",children:[(0,a.jsx)(u.Globe,{className:"mr-2 h-4 w-4"}),"International"]})]})]}),(0,a.jsxs)("div",{className:"flex flex-wrap items-center gap-2.5 rounded-2xl border bg-muted/60 px-4 py-2.5 text-sm",children:[(0,a.jsx)(X.Badge,{variant:"secondary",className:"uppercase tracking-wide",children:"domestic"===E?"Domestic Network":"International Network"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"domestic"===E?"Fastest routes across major Indian cities with policy-friendly fares.":"Passport details required. Popular international hubs pre-loaded for quick search."})]}),(0,a.jsxs)("div",{className:(0,j.cn)("grid gap-2 md:gap-3","round-trip"===e?"md:grid-cols-[1.2fr_auto_1.2fr_1fr_1fr]":"md:grid-cols-[1.3fr_auto_1.3fr_1fr]"),children:[(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsxs)(l.Label,{className:"text-sm font-semibold",children:["From ",(0,a.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,a.jsxs)(N.Select,{value:s,onValueChange:I,children:[(0,a.jsx)(N.SelectTrigger,{className:(0,j.cn)("h-11 transition-all hover:border-primary/50",z.origin&&"border-red-500"),children:(0,a.jsx)(N.SelectValue,{placeholder:"Select Airport"})}),(0,a.jsx)(N.SelectContent,{children:_.map(e=>(0,a.jsx)(N.SelectItem,{value:e.value,children:e.label},e.value))})]}),z.origin&&(0,a.jsx)("p",{className:"text-xs text-red-500",children:z.origin})]}),(0,a.jsxs)("div",{className:"flex flex-col items-center gap-1.5 md:mt-5",children:[(0,a.jsxs)(r.Button,{type:"button",variant:"secondary",onClick:()=>{G||(I?.(h),B?.(s))},disabled:G,className:"h-10 w-full md:w-11 md:h-11 rounded-full shadow-sm flex items-center justify-center px-4",children:[(0,a.jsx)(b,{className:"h-4 w-4"}),(0,a.jsx)("span",{className:"ml-2 text-xs font-semibold md:hidden",children:"Swap"})]}),(0,a.jsx)("p",{className:"text-center text-xs text-muted-foreground hidden md:block",children:"Swap"})]}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsxs)(l.Label,{className:"text-sm font-semibold",children:["To ",(0,a.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,a.jsxs)(N.Select,{value:h,onValueChange:B,children:[(0,a.jsx)(N.SelectTrigger,{className:(0,j.cn)("h-11 transition-all hover:border-primary/50",z.destination&&"border-red-500"),children:(0,a.jsx)(N.SelectValue,{placeholder:"Select Airport"})}),(0,a.jsx)(N.SelectContent,{children:_.map(e=>(0,a.jsx)(N.SelectItem,{value:e.value,children:e.label},e.value))})]}),z.destination&&(0,a.jsx)("p",{className:"text-xs text-red-500",children:z.destination})]}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsxs)(l.Label,{className:"text-sm font-semibold",children:["Departure Date ",(0,a.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,a.jsxs)(d.Popover,{children:[(0,a.jsx)(d.PopoverTrigger,{asChild:!0,children:(0,a.jsxs)(r.Button,{variant:"outline",className:(0,j.cn)("h-11 w-full justify-start text-left font-normal transition-all hover:border-primary/50",!y&&"text-muted-foreground",z.departureDate&&"border-red-500"),children:[(0,a.jsx)(m.CalendarIcon,{className:"mr-2 h-4 w-4"}),y?(0,v.format)(y,"PPP"):(0,a.jsx)("span",{children:"Pick a date"})]})}),(0,a.jsx)(d.PopoverContent,{className:"w-auto p-0",children:(0,a.jsx)(c.Calendar,{mode:"single",selected:y||void 0,onSelect:e=>T?.(e||null),initialFocus:!0,disabled:e=>e<new Date(new Date().setHours(0,0,0,0))})})]}),z.departureDate&&(0,a.jsx)("p",{className:"text-xs text-red-500",children:z.departureDate})]}),"round-trip"===e&&(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsxs)(l.Label,{className:"text-sm font-semibold",children:["Return Date ",(0,a.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,a.jsxs)(d.Popover,{children:[(0,a.jsx)(d.PopoverTrigger,{asChild:!0,children:(0,a.jsxs)(r.Button,{variant:"outline",className:(0,j.cn)("h-11 w-full justify-start text-left font-normal transition-all hover:border-primary/50",!w&&"text-muted-foreground",z.returnDate&&"border-red-500"),children:[(0,a.jsx)(m.CalendarIcon,{className:"mr-2 h-4 w-4"}),w?(0,v.format)(w,"PPP"):(0,a.jsx)("span",{children:"Pick a date"})]})}),(0,a.jsx)(d.PopoverContent,{className:"w-auto p-0",children:(0,a.jsx)(c.Calendar,{mode:"single",selected:w||void 0,onSelect:e=>F?.(e||null),initialFocus:!0,disabled:e=>e<new Date(new Date().setHours(0,0,0,0))||!!y&&e<=y})})]}),z.returnDate&&(0,a.jsx)("p",{className:"text-xs text-red-500",children:z.returnDate})]})]}),(0,a.jsxs)("div",{className:"grid gap-3 md:grid-cols-3",children:[(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsxs)(l.Label,{className:"text-sm font-semibold",children:["Passengers ",(0,a.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[(0,a.jsx)(r.Button,{type:"button",variant:"outline",size:"icon",onClick:()=>{let e=Math.max(1,(parseInt(S)||1)-1);A?.(e.toString())},disabled:1>=parseInt(S),className:"h-11 w-11 transition-all hover:border-primary/50",children:(0,a.jsx)(f,{className:"h-4 w-4"})}),(0,a.jsx)(n.Input,{type:"number",min:"1",max:"20",value:S,onChange:e=>{let a=e.target.value;(""===a||parseInt(a)>=1&&20>=parseInt(a))&&A?.(a||"1")},className:"h-11 text-center w-20 font-semibold"}),(0,a.jsx)(r.Button,{type:"button",variant:"outline",size:"icon",onClick:()=>{let e=Math.min(20,(parseInt(S)||1)+1);A?.(e.toString())},disabled:parseInt(S)>=20,className:"h-11 w-11 transition-all hover:border-primary/50",children:(0,a.jsx)(g.Plus,{className:"h-4 w-4"})})]}),(0,a.jsx)("p",{className:"text-xs text-muted-foreground",children:"1-20 passengers"})]}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsxs)(l.Label,{className:"text-sm font-semibold",children:["Class ",(0,a.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,a.jsxs)(N.Select,{value:k,onValueChange:L,children:[(0,a.jsx)(N.SelectTrigger,{className:"h-11 transition-all hover:border-primary/50",children:(0,a.jsx)(N.SelectValue,{placeholder:"Select Class"})}),(0,a.jsxs)(N.SelectContent,{children:[(0,a.jsx)(N.SelectItem,{value:"Economy",children:"Economy"}),(0,a.jsx)(N.SelectItem,{value:"Premium",children:"Premium Economy"}),(0,a.jsx)(N.SelectItem,{value:"Business",children:"Business"})]})]})]}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsxs)(l.Label,{className:"text-sm font-semibold",children:["Special Fare ",(0,a.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,a.jsxs)(N.Select,{value:C,onValueChange:R,children:[(0,a.jsx)(N.SelectTrigger,{className:"h-11 transition-all hover:border-primary/50",children:(0,a.jsx)(N.SelectValue,{placeholder:"Select Fare Type"})}),(0,a.jsxs)(N.SelectContent,{children:[(0,a.jsx)(N.SelectItem,{value:"Regular",children:"Regular"}),(0,a.jsx)(N.SelectItem,{value:"Deals",children:"Deals"}),(0,a.jsx)(N.SelectItem,{value:"Student",children:"Student"}),(0,a.jsx)(N.SelectItem,{value:"Senior",children:"Senior"}),(0,a.jsx)(N.SelectItem,{value:"Armed Forces",children:"Armed Forces"}),(0,a.jsx)(N.SelectItem,{value:"SOTO",children:"SOTO"})]})]})]})]}),(0,a.jsx)("div",{className:"flex justify-end pt-2",children:(0,a.jsxs)(r.Button,{size:"lg",className:"w-full md:w-auto min-w-[180px] bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200 font-semibold text-base h-11",onClick:M,children:[(0,a.jsx)(p.Search,{className:"mr-2 h-5 w-5"}),"Search Flights"]})}),(0,a.jsxs)("div",{className:"grid gap-3 md:grid-cols-3 pt-2 text-sm",children:[(0,a.jsxs)("div",{className:"rounded-2xl border bg-background/80 p-3.5 shadow-sm",children:[(0,a.jsx)("p",{className:"text-xs uppercase tracking-wide text-muted-foreground",children:"Trip Type"}),(0,a.jsx)("p",{className:"text-base font-semibold capitalize mt-1",children:U}),(0,a.jsx)("p",{className:"text-xs text-muted-foreground mt-1",children:"round-trip"===e?"Return date enabled":"One-way itinerary"})]}),(0,a.jsxs)("div",{className:"rounded-2xl border bg-background/80 p-3.5 shadow-sm",children:[(0,a.jsx)("p",{className:"text-xs uppercase tracking-wide text-muted-foreground",children:"Passengers"}),(0,a.jsxs)("p",{className:"text-base font-semibold mt-1",children:[q," traveler",1!==q?"s":""]}),(0,a.jsxs)("p",{className:"text-xs text-muted-foreground mt-1",children:["Cabin: ",k]})]}),(0,a.jsxs)("div",{className:"rounded-2xl border bg-background/80 p-3.5 shadow-sm",children:[(0,a.jsx)("p",{className:"text-xs uppercase tracking-wide text-muted-foreground",children:"Special Fare"}),(0,a.jsx)("p",{className:"text-base font-semibold mt-1",children:C}),(0,a.jsx)("p",{className:"text-xs text-muted-foreground mt-1",children:"international"===E?"Passport details captured later":"In-policy fares highlighted"})]})]})]})})}var J=e.i(95928),Q=e.i(30066),ee=e.i(17121),ea=e.i(89305),et=e.i(7756),es=e.i(14257),er=e.i(28211),ei=e.i(7438),el=e.i(53549),en=e.i(85003),eo=e.i(67049),ed=e.i(36637),ec=e.i(22938),em=e.i(89670);let ep=[{id:"Search",label:"Search"},{id:"Listing",label:"Listing"},{id:"Fare Review",label:"Fare Review"},{id:"Passenger Details",label:"Passenger Details"},{id:"Ancillaries",label:"Ancillaries"},{id:"Payment Pending",label:"Payment Pending"},{id:"Booking Confirmed",label:"Booking Confirmed"}];function eu(){let e=(0,s.useRouter)(),i=(0,s.useSearchParams)(),{currentUser:o}=(0,ei.useAppStore)(),d="SUPER_ADMIN"===o.role,c=i.get("selectedFlight"),[m,p]=(0,t.useState)("Search"),[u,x]=(0,t.useState)(null),[g,h]=(0,t.useState)((0,ec.generateBookingId)()),[f,b]=(0,t.useState)(""),[v,N]=(0,t.useState)({tripType:"one-way",origin:"",destination:"",departureDate:null,returnDate:null,travellers:"1",class:"Economy",specialFare:"Regular"}),[y,w]=(0,t.useState)(!1),[S,k]=(0,t.useState)({}),[C,P]=(0,t.useState)(null),[D,I]=(0,t.useState)(!1),[B,T]=(0,t.useState)(null),[F,A]=(0,t.useState)({adults:1,children:0,infants:0}),[L,R]=(0,t.useState)({firstName:"",lastName:"",dob:"",gender:"",mobile:"",email:"",gst:"",passport:"",passportExpiry:""}),[$,M]=(0,t.useState)({extraBaggage:!1,extraBaggagePrice:1500,mealSelection:!1,mealPrice:1200,seatSelection:!1,seatPrice:800}),[z,E]=(0,t.useState)({paymentMethod:"",payableAmount:0,walletUsage:!1,acceptTerms:!1}),[O,_]=(0,t.useState)(null),G=(0,t.useRef)(null),q=(0,t.useRef)(null),[U,H]=(0,t.useState)({});(0,t.useEffect)(()=>{if(c){let a=J.MOCK_FLIGHTS.find(e=>e.id===c);if(a){x(a),P({selectedFlight:a.id,fareType:"Standard",airline:a.airline,time:a.departure.time,price:a.price.toString()});let t=i.get("origin"),s=i.get("destination"),r=i.get("departureDate"),l=i.get("returnDate"),n=i.get("travellers"),o=i.get("class"),d=i.get("tripType"),c="true"===i.get("isInternational");t&&N(e=>({...e,origin:t})),s&&N(e=>({...e,destination:s})),r&&N(e=>({...e,departureDate:new Date(r)})),l&&N(e=>({...e,returnDate:new Date(l)})),n&&N(e=>({...e,travellers:n})),o&&N(e=>({...e,class:o})),d&&N(e=>({...e,tripType:d})),w(c);let m=new Date(r||a.departure.time);T((0,ec.checkFlightPolicyCompliance)(a.price,o||"Economy",m,c)),p("Fare Review"),q.current=Date.now(),I(!1);let u=new URLSearchParams(i.toString());u.delete("selectedFlight"),e.replace(`/dashboard/flights?${u.toString()}`)}}},[c,e,i]),(0,t.useEffect)(()=>{if("Payment Pending"===m&&q.current){let e=()=>{let e=Math.max(0,15-(Date.now()-q.current)/1e3/60);_(Math.ceil(e)),e<=0&&(G.current&&(clearInterval(G.current),G.current=null),el.toast.error("Payment session expired",{description:"The booking session has expired. Please start a new search."}),p("Search"))};return e(),G.current=setInterval(e,1e3),()=>{G.current&&(clearInterval(G.current),G.current=null)}}_(null)},[m]);let V=()=>ep.findIndex(e=>e.id===m),Y=e=>{let a=new Date(e),t=new Date,s=t.getFullYear()-a.getFullYear(),r=t.getMonth()-a.getMonth();return(r<0||0===r&&t.getDate()<a.getDate())&&s--,s},K=async()=>{let e=V();if(-1===e||e>=ep.length-1)return;let a=ep[e+1].id,t=(0,en.canTransitionStage)("FLIGHT",m,a);if(!t.allowed)return void el.toast.error("Cannot skip stages",{description:t.reason});let s={};if("Listing"===m){if(!u||!C)return void el.toast.error("Please select a flight to continue",{description:"Click on a flight card to select it before proceeding."});s=C}else if("Fare Review"===m){if(!D)return void el.toast.error("Please accept the fare rules to continue",{description:"You must accept the fare terms before proceeding"});s={fareAccepted:!0}}else if("Passenger Details"===m){let e;if(e=F.adults+F.children+F.infants,F.adults<1?(el.toast.error("At least 1 adult passenger is required"),!0):F.adults>20?(el.toast.error("Maximum 20 adult passengers allowed per booking"),!0):F.children>19?(el.toast.error("Maximum 19 children allowed per booking"),!0):F.infants>F.adults?(el.toast.error("Number of infants cannot exceed number of adults"),!0):e>20?(el.toast.error("Maximum 20 passengers allowed per booking"),!0):e<1&&(el.toast.error("At least 1 passenger is required"),!0))return;if(!(()=>{let e={};if(L.firstName?L.firstName.length<2?e.firstName="First name must be at least 2 characters":/^[a-zA-Z\s]+$/.test(L.firstName)||(e.firstName="First name can only contain alphabets and spaces"):e.firstName="First name is required",L.lastName&&L.lastName.length>0&&!/^[a-zA-Z\s]+$/.test(L.lastName)&&(e.lastName="Last name can only contain alphabets and spaces"),L.dob?isNaN(new Date(L.dob).getTime())?e.dob="Please enter a valid date":0>Y(L.dob)&&(e.dob="Date of Birth cannot be in the future"):e.dob="Date of Birth is required",L.gender||(e.gender="Gender is required"),L.mobile){let a=L.mobile.replace(/\D/g,"");10!==a.length?e.mobile="Mobile number must be 10 digits":/^[6-9]/.test(a)||(e.mobile="Mobile number must start with 6, 7, 8, or 9")}else e.mobile="Mobile number is required";if(L.email?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(L.email)||(e.email="Please enter a valid email address"):e.email="Email is required",y)if(L.passport?/^[A-Z]{1}[0-9]{7}$/.test(L.passport.toUpperCase())||(e.passport="Passport number must be 1 letter followed by 7 digits (e.g., A1234567)"):e.passport="Passport number is required for international flights",L.passportExpiry){let a=new Date(L.passportExpiry),t=new Date;t.setHours(0,0,0,0),isNaN(a.getTime())?e.passportExpiry="Please enter a valid expiry date":a<=t&&(e.passportExpiry="Passport expiry date must be in the future")}else e.passportExpiry="Passport expiry date is required for international flights";return H(e),0===Object.keys(e).length})())return void el.toast.error("Please fill all passenger details");s={...L,passengerCount:F}}else if("Ancillaries"===m)s={ancillaries:$};else if("Payment Pending"===m){if(!z.paymentMethod)return void el.toast.error("Please select payment method");if(!z.acceptTerms)return void el.toast.error("Please accept terms and conditions");let e=($.extraBaggage?$.extraBaggagePrice:0)+($.mealSelection?$.mealPrice:0)+($.seatSelection?$.seatPrice:0),a=u?u.price+3750+e:0;if(z.walletUsage){let e=(0,em.getWalletBalance)();if(!(0,em.hasSufficientBalance)(a))return void el.toast.error("Insufficient wallet balance",{description:`Wallet balance (₹${e.toLocaleString("en-IN")}) is less than total amount (₹${a.toLocaleString("en-IN")}). Please add funds to continue.`,action:{label:"Add Funds",onClick:()=>{window.location.href="/dashboard/wallet"}}})}if(q.current&&(Date.now()-q.current)/1e3/60>15){el.toast.error("Payment timeout",{description:"The booking session has expired. Please start a new search."}),p("Search");return}s={...z,payableAmount:a}}let r=(0,en.transitionStage)("FLIGHT",g,m,a,s,o.id);if(r.success){if(p(a),"Booking Confirmed"===a){let e=(0,ec.generateBookingId)(),a=(0,ec.generatePNR)();h(e),b(a);try{let t=await eo.bookingsDB.create({type:"FLIGHT",status:B?.requiresApproval?"PENDING_APPROVAL":"CONFIRMED",details:{...u,bookingId:e,pnr:a,passengerDetails:L,passengerCount:F,ancillaries:$,policyCompliant:B?.compliant??!0},date:new Date().toISOString().split("T")[0],amount:u?.price||0,agentName:o.name,agentId:o.id,approvalStatus:B?.requiresApproval?"PENDING":"APPROVED"});if(z.walletUsage&&u){let e=($.extraBaggage?$.extraBaggagePrice:0)+($.mealSelection?$.mealPrice:0)+($.seatSelection?$.seatPrice:0),a=u.price+3750+e;await (0,em.createTransaction)({date:new Date().toISOString().split("T")[0],description:`Flight Booking ${t.bookingId}`,amount:-a,type:"DEBIT",status:"Completed",paymentMethod:"Wallet",productType:"Flight",bookingId:t.id})}await ed.audit.create("bookings",t.id,{type:"FLIGHT",amount:u?.price||0}),B?.requiresApproval?el.toast.success("Booking submitted for approval!",{description:`Booking ID: ${e}, PNR: ${a}. Policy violations require approval.`}):el.toast.success("Booking confirmed!",{description:`Booking ID: ${e}, PNR: ${a}`}),G.current&&(clearInterval(G.current),G.current=null),_(null),q.current=null}catch(e){console.error("Failed to save booking:",e),el.toast.error("Booking confirmed but failed to save details")}}}else el.toast.error("Cannot proceed",{description:r.error})};return d?(0,a.jsx)("div",{className:"px-6 py-10",children:(0,a.jsx)("div",{className:"max-w-2xl mx-auto",children:(0,a.jsxs)(er.Alert,{children:[(0,a.jsxs)(er.AlertTitle,{className:"flex items-center gap-2",children:[(0,a.jsx)(ee.Lock,{className:"h-4 w-4"}),"Booking access restricted"]}),(0,a.jsx)(er.AlertDescription,{children:"Super Admins supervise agencies but cannot create flight bookings from this workspace. Switch to an agency role (Agency Admin, Agent, or Sub Agent) to access flight booking tools."})]})})}):(0,a.jsxs)("div",{className:"flex flex-col gap-8",children:[(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsx)("h1",{className:"text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent",children:"Flight Booking"}),(0,a.jsx)("p",{className:"text-lg text-muted-foreground",children:"Search and book flights for your business travel with ease."})]}),(0,a.jsx)("div",{className:"w-full overflow-x-auto pb-4",children:(0,a.jsx)("div",{className:"flex items-center min-w-max gap-2",children:ep.map((e,t)=>{let s=V(),r=e.id===m,i=s>t;return(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsxs)("div",{className:(0,j.cn)("flex items-center gap-2 px-4 py-2.5 rounded-full border-2 text-sm font-semibold transition-all duration-200 shadow-sm",r?"bg-primary text-primary-foreground border-primary shadow-md scale-105":i?"bg-primary/10 text-primary border-primary/30":"bg-background text-muted-foreground border-border"),children:[i?(0,a.jsx)(Q.CheckCircle2,{className:"w-4 h-4"}):(0,a.jsx)("span",{className:(0,j.cn)("w-5 h-5 rounded-full flex items-center justify-center text-xs",r&&"bg-primary-foreground/20"),children:t+1}),e.label]}),t<ep.length-1&&(0,a.jsx)("div",{className:(0,j.cn)("w-12 h-0.5 mx-2 transition-colors",i?"bg-primary":"bg-border")})]},e.id)})})}),(0,a.jsxs)("div",{className:(0,j.cn)("transition-all duration-300","Search"!==m&&"opacity-50 pointer-events-none grayscale"),children:[(0,a.jsxs)("div",{className:"flex items-center gap-2 mb-4",children:["Search"!==m&&(0,a.jsx)(ee.Lock,{className:"w-5 h-5 text-muted-foreground"}),(0,a.jsx)("h2",{className:"text-2xl font-bold",children:"Search Criteria"})]}),(0,a.jsx)(Z,{tripType:v.tripType,origin:v.origin,destination:v.destination,departureDate:v.departureDate,returnDate:v.returnDate,travellers:v.travellers,class:v.class,flightType:y?"international":"domestic",onTripTypeChange:e=>N({...v,tripType:e}),onOriginChange:e=>N({...v,origin:e}),onDestinationChange:e=>N({...v,destination:e}),onDepartureDateChange:e=>N({...v,departureDate:e}),onReturnDateChange:e=>N({...v,returnDate:e}),onTravellersChange:e=>N({...v,travellers:e}),onClassChange:e=>N({...v,class:e}),specialFare:v.specialFare,onSpecialFareChange:e=>N({...v,specialFare:e}),onFlightTypeChange:e=>w("international"===e),onSearch:()=>{let e,a;if(!(()=>{let e={};if(v.origin||(e.origin="Origin is required"),v.destination||(e.destination="Destination is required"),v.origin&&v.destination&&v.origin===v.destination&&(e.destination="Destination cannot be same as origin"),v.departureDate){let a=new Date;a.setHours(0,0,0,0);let t=new Date(v.departureDate);t.setHours(0,0,0,0),t<a&&(e.departureDate="Departure date cannot be in the past")}else e.departureDate="Departure date is required";if("round-trip"===v.tripType)if(v.returnDate){if(v.departureDate){let a=new Date(v.departureDate);new Date(v.returnDate)<=a&&(e.returnDate="Return date must be after departure date")}}else e.returnDate="Return date is required for round-trip";let a=F.adults+F.children+F.infants;return F.adults<1&&(e.passengers="At least 1 adult passenger is required"),a>20&&(e.passengers="Maximum 20 passengers allowed per booking"),k(e),0===Object.keys(e).length})())return void el.toast.error("Please fix search errors",{description:"Check all required fields and ensure dates are valid"});A({adults:(a=parseInt((e=v.travellers.split("-"))[0])||1,"business"===e[1]?N(e=>({...e,class:"Business"})):"premium"===e[1]&&N(e=>({...e,class:"Premium"})),Math.min(20,Math.max(1,a))),children:0,infants:0});let t={tripType:v.tripType||"one-way",origin:v.origin,destination:v.destination,dates:v.departureDate?.toISOString()||new Date().toISOString(),travellers:v.travellers||"1",class:v.class||"Economy",specialFare:v.specialFare||"Regular"},s=(0,en.transitionStage)("FLIGHT",g,m,"Listing",t,o.id,"Flight search initiated");if(s.success){let e=new URLSearchParams({origin:v.origin,destination:v.destination,departureDate:v.departureDate?.toISOString()||"",returnDate:v.returnDate?.toISOString()||"",travellers:v.travellers||"1",class:v.class||"Economy",tripType:v.tripType||"one-way",isInternational:y.toString()});window.location.href=`/dashboard/flights/listing?${e.toString()}`}else el.toast.error("Cannot proceed",{description:s.error})},errors:S})]}),V()>1&&u&&(0,a.jsxs)("div",{className:"border rounded-lg p-4 bg-muted/20 flex items-center justify-between opacity-50 pointer-events-none",children:[(0,a.jsxs)("div",{className:"flex items-center gap-4",children:[(0,a.jsx)(ee.Lock,{className:"w-4 h-4 text-muted-foreground"}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("p",{className:"font-semibold",children:[u.airline," - ",u.flightNumber]}),(0,a.jsxs)("p",{className:"text-sm text-muted-foreground",children:[u.departure.city," to ",u.arrival.city]})]})]}),(0,a.jsx)(r.Button,{variant:"outline",size:"sm",disabled:!0,children:"Selected"})]}),"Fare Review"===m&&u&&(0,a.jsxs)("div",{className:"border-2 rounded-xl p-6 space-y-6 bg-card shadow-lg",children:[(0,a.jsx)("div",{className:"flex items-center gap-2",children:(0,a.jsx)("h3",{className:"text-2xl font-bold",children:"Fare Review"})}),B&&!B.compliant&&("AGENT"===o.role||"SUB_AGENT"===o.role)&&(0,a.jsxs)("div",{className:"bg-gradient-to-r from-yellow-50 to-yellow-100/50 dark:from-yellow-950/20 dark:to-yellow-950/10 border-2 border-yellow-300 dark:border-yellow-800 rounded-xl p-5 space-y-3 shadow-sm",children:[(0,a.jsxs)("div",{className:"flex items-center gap-2 text-yellow-800 dark:text-yellow-200",children:[(0,a.jsx)(et.AlertCircle,{className:"h-5 w-5"}),(0,a.jsx)("span",{className:"font-bold text-base",children:"Out of Policy - Approval Required"})]}),(0,a.jsx)("ul",{className:"list-disc list-inside text-sm text-yellow-700 dark:text-yellow-300 space-y-1.5 ml-2",children:B.violations.map((e,t)=>(0,a.jsx)("li",{className:"font-medium",children:e},t))})]}),(0,a.jsxs)("div",{className:"grid grid-cols-2 gap-6 bg-muted/30 rounded-xl p-5",children:[(0,a.jsxs)("div",{className:"space-y-1",children:[(0,a.jsx)("p",{className:"text-sm font-medium text-muted-foreground",children:"Base Fare"}),(0,a.jsxs)("p",{className:"text-xl font-bold",children:[u.currency," ",u.price.toLocaleString("en-IN")]})]}),(0,a.jsxs)("div",{className:"space-y-1",children:[(0,a.jsx)("p",{className:"text-sm font-medium text-muted-foreground",children:"Taxes & Fees"}),(0,a.jsx)("p",{className:"text-xl font-bold",children:"₹3,750"})]}),(0,a.jsx)(es.Separator,{className:"col-span-2 my-2"}),(0,a.jsxs)("div",{className:"col-span-2 flex justify-between items-center pt-2",children:[(0,a.jsx)("span",{className:"text-lg font-bold",children:"Total Amount"}),(0,a.jsxs)("span",{className:"text-2xl font-bold text-primary",children:["₹",(u.price+3750+($.extraBaggage?$.extraBaggagePrice:0)+($.mealSelection?$.mealPrice:0)+($.seatSelection?$.seatPrice:0)).toLocaleString("en-IN")]})]})]}),(0,a.jsxs)("div",{className:"flex items-start gap-2 pt-2",children:[(0,a.jsx)("input",{type:"checkbox",id:"fareAccepted",checked:D,onChange:e=>I(e.target.checked),className:"mt-1 rounded border-gray-300"}),(0,a.jsxs)(l.Label,{htmlFor:"fareAccepted",className:"cursor-pointer text-sm",children:["I accept the fare rules, cancellation policy, and terms & conditions"," ",(0,a.jsx)("span",{className:"text-red-500",children:"*"})]})]}),(0,a.jsx)("div",{className:"flex justify-end pt-2",children:(0,a.jsxs)(r.Button,{onClick:K,disabled:!D,size:"lg",className:"min-w-[200px] font-semibold",children:["Continue to Passenger Details ",(0,a.jsx)(ea.ChevronRight,{className:"w-4 h-4 ml-2"})]})})]}),(0,a.jsxs)("div",{className:(0,j.cn)("border-2 rounded-xl p-6 space-y-6 bg-card shadow-lg transition-all",3>V()?"hidden":V()>3?"opacity-50 pointer-events-none":""),children:[(0,a.jsxs)("div",{className:"flex items-center gap-2 mb-2",children:[V()>3&&(0,a.jsx)(ee.Lock,{className:"w-5 h-5 text-muted-foreground"}),(0,a.jsx)("h3",{className:"text-2xl font-bold",children:"Passenger Details"})]}),(0,a.jsxs)("div",{className:"border-2 rounded-xl p-5 bg-gradient-to-br from-muted/50 to-muted/30 mb-6",children:[(0,a.jsx)(l.Label,{className:"text-lg font-bold mb-4 block",children:"Number of Passengers"}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsxs)(l.Label,{htmlFor:"adults",className:"text-sm",children:["Adults (12+ years) ",(0,a.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[(0,a.jsx)(r.Button,{type:"button",variant:"outline",size:"sm",onClick:()=>A({...F,adults:Math.max(1,F.adults-1)}),disabled:F.adults<=1,children:"-"}),(0,a.jsx)(n.Input,{id:"adults",type:"number",min:"1",max:"20",value:F.adults,onChange:e=>{let a=parseInt(e.target.value)||1;A({...F,adults:Math.min(20,Math.max(1,a))})},className:"text-center"}),(0,a.jsx)(r.Button,{type:"button",variant:"outline",size:"sm",onClick:()=>A({...F,adults:Math.min(20,F.adults+1)}),disabled:F.adults>=20,children:"+"})]}),(0,a.jsx)("p",{className:"text-xs text-muted-foreground",children:"Minimum 1 adult required"})]}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsx)(l.Label,{htmlFor:"children",className:"text-sm",children:"Children (2-11 years)"}),(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[(0,a.jsx)(r.Button,{type:"button",variant:"outline",size:"sm",onClick:()=>A({...F,children:Math.max(0,F.children-1)}),disabled:F.children<=0,children:"-"}),(0,a.jsx)(n.Input,{id:"children",type:"number",min:"0",max:"19",value:F.children,onChange:e=>{let a=parseInt(e.target.value)||0;A({...F,children:Math.min(19,Math.max(0,a))})},className:"text-center"}),(0,a.jsx)(r.Button,{type:"button",variant:"outline",size:"sm",onClick:()=>A({...F,children:Math.min(19,F.children+1)}),disabled:F.children>=19,children:"+"})]}),(0,a.jsx)("p",{className:"text-xs text-muted-foreground",children:"Maximum 19 children"})]}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsx)(l.Label,{htmlFor:"infants",className:"text-sm",children:"Infants (Under 2 years)"}),(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[(0,a.jsx)(r.Button,{type:"button",variant:"outline",size:"sm",onClick:()=>A({...F,infants:Math.max(0,F.infants-1)}),disabled:F.infants<=0,children:"-"}),(0,a.jsx)(n.Input,{id:"infants",type:"number",min:"0",max:F.adults,value:F.infants,onChange:e=>{let a=parseInt(e.target.value)||0;A({...F,infants:Math.min(F.adults,Math.max(0,a))})},className:"text-center"}),(0,a.jsx)(r.Button,{type:"button",variant:"outline",size:"sm",onClick:()=>A({...F,infants:Math.min(F.adults,F.infants+1)}),disabled:F.infants>=F.adults,children:"+"})]}),(0,a.jsxs)("p",{className:"text-xs text-muted-foreground",children:["Maximum ",F.adults," infant",1!==F.adults?"s":""," (1 per adult)"]})]})]}),(0,a.jsx)("div",{className:"mt-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-950/10 border-2 border-blue-200 dark:border-blue-800 rounded-xl",children:(0,a.jsxs)("p",{className:"text-sm font-semibold text-blue-800 dark:text-blue-200",children:[(0,a.jsx)("strong",{children:"Total Passengers:"})," ",F.adults+F.children+F.infants," ","(",F.adults," adult",1!==F.adults?"s":"",F.children>0&&`, ${F.children} child${1!==F.children?"ren":""}`,F.infants>0&&`, ${F.infants} infant${1!==F.infants?"s":""}`,")"]})})]}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsxs)(l.Label,{htmlFor:"firstName",children:["First Name ",(0,a.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,a.jsx)(n.Input,{id:"firstName",value:L.firstName,onChange:e=>R({...L,firstName:e.target.value}),className:(0,j.cn)(U.firstName&&"border-red-500")}),U.firstName&&(0,a.jsx)("p",{className:"text-xs text-red-500",children:U.firstName})]}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsx)(l.Label,{htmlFor:"lastName",children:"Last Name"}),(0,a.jsx)(n.Input,{id:"lastName",value:L.lastName,onChange:e=>R({...L,lastName:e.target.value}),className:(0,j.cn)(U.lastName&&"border-red-500")}),U.lastName&&(0,a.jsx)("p",{className:"text-xs text-red-500",children:U.lastName})]}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsxs)(l.Label,{htmlFor:"dob",children:["Date of Birth ",(0,a.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,a.jsx)(n.Input,{id:"dob",type:"date",max:new Date().toISOString().split("T")[0],value:L.dob,onChange:e=>R({...L,dob:e.target.value}),className:(0,j.cn)(U.dob&&"border-red-500")}),U.dob&&(0,a.jsx)("p",{className:"text-xs text-red-500",children:U.dob}),L.dob&&!U.dob&&(0,a.jsxs)("p",{className:"text-xs text-muted-foreground",children:["Age: ",Y(L.dob)," years",Y(L.dob)>12?" (Adult)":Y(L.dob)>=2?" (Child)":" (Infant)"]})]}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsxs)(l.Label,{htmlFor:"gender",children:["Gender ",(0,a.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,a.jsxs)("select",{id:"gender",className:(0,j.cn)("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",U.gender&&"border-red-500"),value:L.gender,onChange:e=>R({...L,gender:e.target.value}),children:[(0,a.jsx)("option",{value:"",children:"Select Gender"}),(0,a.jsx)("option",{value:"male",children:"Male"}),(0,a.jsx)("option",{value:"female",children:"Female"}),(0,a.jsx)("option",{value:"other",children:"Other"})]}),U.gender&&(0,a.jsx)("p",{className:"text-xs text-red-500",children:U.gender})]}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsxs)(l.Label,{htmlFor:"mobile",children:["Mobile Number ",(0,a.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,a.jsx)(n.Input,{id:"mobile",value:L.mobile,onChange:e=>R({...L,mobile:e.target.value}),className:(0,j.cn)(U.mobile&&"border-red-500")}),U.mobile&&(0,a.jsx)("p",{className:"text-xs text-red-500",children:U.mobile})]}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsxs)(l.Label,{htmlFor:"email",children:["Email ",(0,a.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,a.jsx)(n.Input,{id:"email",type:"email",value:L.email,onChange:e=>R({...L,email:e.target.value}),className:(0,j.cn)(U.email&&"border-red-500")}),U.email&&(0,a.jsx)("p",{className:"text-xs text-red-500",children:U.email})]}),y&&(0,a.jsxs)("div",{className:"md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4",children:[(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsxs)(l.Label,{htmlFor:"passport",children:["Passport Number ",(0,a.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,a.jsx)(n.Input,{id:"passport",value:L.passport,onChange:e=>R({...L,passport:e.target.value.toUpperCase()}),placeholder:"A1234567",maxLength:8,className:(0,j.cn)(U.passport&&"border-red-500")}),U.passport&&(0,a.jsx)("p",{className:"text-xs text-red-500",children:U.passport}),(0,a.jsx)("p",{className:"text-xs text-muted-foreground",children:"Format: 1 letter followed by 7 digits (e.g., A1234567)"})]}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsxs)(l.Label,{htmlFor:"passportExpiry",children:["Passport Expiry Date ",(0,a.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,a.jsx)(n.Input,{id:"passportExpiry",type:"date",value:L.passportExpiry,onChange:e=>R({...L,passportExpiry:e.target.value}),className:(0,j.cn)(U.passportExpiry&&"border-red-500")}),U.passportExpiry&&(0,a.jsx)("p",{className:"text-xs text-red-500",children:U.passportExpiry})]})]})]}),"Passenger Details"===m&&(0,a.jsx)("div",{className:"flex justify-end pt-4",children:(0,a.jsxs)(r.Button,{onClick:K,size:"lg",className:"min-w-[200px] font-semibold",children:["Continue to Ancillaries ",(0,a.jsx)(ea.ChevronRight,{className:"w-4 h-4 ml-2"})]})})]}),V()>=4&&(0,a.jsxs)("div",{className:(0,j.cn)("border-2 rounded-xl p-6 space-y-6 bg-card shadow-lg transition-all",V()>4?"opacity-50 pointer-events-none":""),children:[(0,a.jsxs)("div",{className:"flex items-center gap-2 mb-2",children:[V()>4&&(0,a.jsx)(ee.Lock,{className:"w-5 h-5 text-muted-foreground"}),(0,a.jsx)("h3",{className:"text-2xl font-bold",children:"Ancillaries"}),(0,a.jsx)("p",{className:"text-sm text-muted-foreground ml-2",children:"(Optional)"})]}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[(0,a.jsxs)("div",{className:(0,j.cn)("border-2 p-5 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md",$.extraBaggage?"border-primary bg-primary/10 ring-2 ring-primary/20 shadow-sm":"hover:border-primary/50 hover:bg-muted/50"),onClick:()=>M({...$,extraBaggage:!$.extraBaggage}),children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,a.jsx)("p",{className:"font-medium",children:"Extra Baggage"}),$.extraBaggage&&(0,a.jsx)("div",{className:"h-5 w-5 rounded-full bg-primary flex items-center justify-center",children:(0,a.jsx)(Q.CheckCircle2,{className:"h-4 w-4 text-primary-foreground"})})]}),(0,a.jsx)("p",{className:"text-sm text-muted-foreground mb-2",children:"Additional 15kg baggage allowance"}),(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsx)("span",{className:"text-sm font-semibold text-primary",children:"+ ₹1,500"}),(0,a.jsx)(r.Button,{variant:$.extraBaggage?"default":"outline",size:"sm",className:"mt-2",onClick:e=>{e.stopPropagation(),M({...$,extraBaggage:!$.extraBaggage})},children:$.extraBaggage?"Remove":"Add"})]})]}),(0,a.jsxs)("div",{className:(0,j.cn)("border-2 p-5 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md",$.mealSelection?"border-primary bg-primary/10 ring-2 ring-primary/20 shadow-sm":"hover:border-primary/50 hover:bg-muted/50"),onClick:()=>M({...$,mealSelection:!$.mealSelection}),children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,a.jsx)("p",{className:"font-medium",children:"Meal Selection"}),$.mealSelection&&(0,a.jsx)("div",{className:"h-5 w-5 rounded-full bg-primary flex items-center justify-center",children:(0,a.jsx)(Q.CheckCircle2,{className:"h-4 w-4 text-primary-foreground"})})]}),(0,a.jsx)("p",{className:"text-sm text-muted-foreground mb-2",children:"Pre-book your meal preference"}),(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsx)("span",{className:"text-sm font-semibold text-primary",children:"+ ₹1,200"}),(0,a.jsx)(r.Button,{variant:$.mealSelection?"default":"outline",size:"sm",className:"mt-2",onClick:e=>{e.stopPropagation(),M({...$,mealSelection:!$.mealSelection})},children:$.mealSelection?"Remove":"Select"})]})]}),(0,a.jsxs)("div",{className:(0,j.cn)("border-2 p-5 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md",$.seatSelection?"border-primary bg-primary/10 ring-2 ring-primary/20 shadow-sm":"hover:border-primary/50 hover:bg-muted/50"),onClick:()=>M({...$,seatSelection:!$.seatSelection}),children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,a.jsx)("p",{className:"font-medium",children:"Seat Selection"}),$.seatSelection&&(0,a.jsx)("div",{className:"h-5 w-5 rounded-full bg-primary flex items-center justify-center",children:(0,a.jsx)(Q.CheckCircle2,{className:"h-4 w-4 text-primary-foreground"})})]}),(0,a.jsx)("p",{className:"text-sm text-muted-foreground mb-2",children:"Choose your preferred seat"}),(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsx)("span",{className:"text-sm font-semibold text-primary",children:"+ ₹800"}),(0,a.jsx)(r.Button,{variant:$.seatSelection?"default":"outline",size:"sm",className:"mt-2",onClick:e=>{e.stopPropagation(),M({...$,seatSelection:!$.seatSelection})},children:$.seatSelection?"Remove":"Choose"})]})]})]}),"Ancillaries"===m&&(0,a.jsxs)("div",{className:"mt-4 p-4 bg-muted/30 rounded-lg",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsx)("span",{className:"text-sm font-medium",children:"Selected Ancillaries:"}),(0,a.jsxs)("span",{className:"text-sm font-semibold",children:["₹",($.extraBaggage?$.extraBaggagePrice:0)+($.mealSelection?$.mealPrice:0)+($.seatSelection?$.seatPrice:0)]})]}),(0,a.jsx)("div",{className:"mt-2 text-xs text-muted-foreground",children:$.extraBaggage||$.mealSelection||$.seatSelection?[$.extraBaggage&&"Extra Baggage",$.mealSelection&&"Meal Selection",$.seatSelection&&"Seat Selection"].filter(Boolean).join(", "):"No ancillaries selected (optional)"})]}),"Ancillaries"===m&&(0,a.jsx)("div",{className:"flex justify-end pt-4",children:(0,a.jsxs)(r.Button,{onClick:K,size:"lg",className:"min-w-[200px] font-semibold",children:["Continue to Payment ",(0,a.jsx)(ea.ChevronRight,{className:"w-4 h-4 ml-2"})]})})]}),"Payment Pending"===m&&(0,a.jsxs)("div",{className:"border-2 rounded-xl p-6 space-y-6 bg-card shadow-lg",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsx)("h3",{className:"text-2xl font-bold",children:"Payment Pending"}),null!==O&&(0,a.jsxs)(X.Badge,{variant:O<3?"destructive":"secondary",children:["Time remaining: ",O," min"]})]}),(0,a.jsxs)("div",{className:"bg-gradient-to-r from-yellow-50 to-yellow-100/50 dark:from-yellow-950/20 dark:to-yellow-950/10 p-5 rounded-xl border-2 border-yellow-300 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200 shadow-sm",children:[(0,a.jsxs)("p",{className:"font-bold text-lg",children:["Total Amount: ₹",u?(u.price+3750+($.extraBaggage?$.extraBaggagePrice:0)+($.mealSelection?$.mealPrice:0)+($.seatSelection?$.seatPrice:0)).toLocaleString("en-IN"):0]}),(0,a.jsx)("p",{className:"text-sm mt-2",children:"Please proceed to payment gateway to confirm your booking."}),null!==O&&O<5&&(0,a.jsxs)("p",{className:"text-sm font-semibold mt-3 flex items-center gap-1",children:[(0,a.jsx)(et.AlertCircle,{className:"h-4 w-4"}),"Payment session expires in ",O," minute",1!==O?"s":""]})]}),(0,a.jsxs)("div",{className:"bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-950/10 p-5 rounded-xl border-2 border-blue-200 dark:border-blue-800 shadow-sm",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsx)("span",{className:"text-sm font-semibold text-blue-800 dark:text-blue-200",children:"Wallet Balance:"}),(0,a.jsxs)("span",{className:"text-xl font-bold text-blue-900 dark:text-blue-100",children:["₹",parseFloat(localStorage.getItem("wallet_balance")||"0").toLocaleString("en-IN")]})]}),u&&(0,a.jsxs)("p",{className:"text-xs text-blue-700 dark:text-blue-300 mt-1",children:["Required: ₹",(u.price+3750+($.extraBaggage?$.extraBaggagePrice:0)+($.mealSelection?$.mealPrice:0)+($.seatSelection?$.seatPrice:0)).toLocaleString("en-IN"),parseFloat(localStorage.getItem("wallet_balance")||"0")<u.price+3750+($.extraBaggage?$.extraBaggagePrice:0)+($.mealSelection?$.mealPrice:0)+($.seatSelection?$.seatPrice:0)&&(0,a.jsx)("span",{className:"text-red-600 dark:text-red-400 font-semibold ml-2",children:"(Insufficient balance)"})]})]}),(0,a.jsxs)("div",{className:"space-y-4",children:[(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsx)(l.Label,{children:"Payment Method"}),(0,a.jsxs)("select",{className:"flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm",value:z.paymentMethod,onChange:e=>E({...z,paymentMethod:e.target.value,walletUsage:"wallet"===e.target.value}),children:[(0,a.jsx)("option",{value:"",children:"Select payment method"}),(0,a.jsx)("option",{value:"wallet",children:"Wallet"}),(0,a.jsx)("option",{value:"card",children:"Credit/Debit Card"}),(0,a.jsx)("option",{value:"netbanking",children:"Net Banking"})]})]}),(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[(0,a.jsx)("input",{type:"checkbox",id:"acceptTerms",checked:z.acceptTerms,onChange:e=>E({...z,acceptTerms:e.target.checked})}),(0,a.jsxs)(l.Label,{htmlFor:"acceptTerms",className:"cursor-pointer",children:["I accept the terms and conditions ",(0,a.jsx)("span",{className:"text-red-500",children:"*"})]})]})]}),(0,a.jsx)("div",{className:"flex justify-end pt-2",children:(0,a.jsx)(r.Button,{onClick:K,size:"lg",className:"min-w-[200px] bg-green-600 hover:bg-green-700 font-semibold shadow-lg hover:shadow-xl transition-all",children:"Pay & Confirm"})})]}),"Booking Confirmed"===m&&(0,a.jsxs)("div",{className:"border-2 rounded-xl p-8 text-center bg-gradient-to-br from-green-50 to-green-100/50 border-green-300 shadow-xl",children:[(0,a.jsx)("div",{className:"flex justify-center mb-6",children:(0,a.jsx)("div",{className:"h-20 w-20 bg-green-100 rounded-full flex items-center justify-center shadow-lg",children:(0,a.jsx)(Q.CheckCircle2,{className:"h-10 w-10 text-green-600"})})}),(0,a.jsx)("h2",{className:"text-3xl font-bold text-green-800 mb-3",children:"Booking Confirmed!"}),(0,a.jsx)("p",{className:"text-lg text-green-700 mb-8 font-medium",children:"Your flight has been successfully booked and ticketed."}),g&&f&&(0,a.jsxs)("div",{className:"bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 space-y-3 max-w-md mx-auto border-2 border-green-200 shadow-lg",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsx)("span",{className:"font-bold text-base",children:"Booking ID:"}),(0,a.jsx)("span",{className:"font-mono text-xl font-bold text-primary",children:g})]}),(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsx)("span",{className:"font-bold text-base",children:"PNR:"}),(0,a.jsx)("span",{className:"font-mono text-xl font-bold text-primary",children:f})]})]}),(0,a.jsxs)("div",{className:"flex justify-center gap-4",children:[(0,a.jsx)(r.Button,{variant:"outline",onClick:()=>{if(u&&g&&f){var e,a;let t,s,r,i,l,n,o,d,c=($.extraBaggage?$.extraBaggagePrice:0)+($.mealSelection?$.mealPrice:0)+($.seatSelection?$.seatPrice:0);a=e={bookingId:g,pnr:f,flight:{airline:u.airline,flightNumber:u.flightNumber,departure:u.departure,arrival:u.arrival,duration:u.duration},passenger:{firstName:L.firstName,lastName:L.lastName||void 0,dob:L.dob,gender:L.gender,mobile:L.mobile,email:L.email,passport:L.passport||void 0},passengerCount:F,bookingDate:new Date().toISOString(),totalAmount:u.price+3750+c,ancillaries:{extraBaggage:$.extraBaggage,mealSelection:$.mealSelection,seatSelection:$.seatSelection}},t=e=>new Date(e).toLocaleDateString("en-IN",{weekday:"short",year:"numeric",month:"short",day:"numeric"}),s=e=>new Date(e).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit",hour12:!0}),r=1500*!!a.ancillaries?.extraBaggage+1200*!!a.ancillaries?.mealSelection+800*!!a.ancillaries?.seatSelection,l=new Blob([i=`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Flight Ticket - ${a.bookingId}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #f5f5f5;
      padding: 20px;
    }
    .ticket {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .ticket-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .ticket-header h1 {
      font-size: 28px;
      margin-bottom: 10px;
      font-weight: 600;
    }
    .ticket-header .booking-info {
      display: flex;
      justify-content: center;
      gap: 30px;
      margin-top: 15px;
      font-size: 14px;
      opacity: 0.95;
    }
    .ticket-body {
      padding: 30px;
    }
    .flight-section {
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      padding: 25px;
      margin-bottom: 25px;
    }
    .flight-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid #e5e7eb;
    }
    .airline-name {
      font-size: 22px;
      font-weight: 600;
      color: #1f2937;
    }
    .flight-number {
      font-size: 16px;
      color: #6b7280;
    }
    .route-info {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: 20px;
      align-items: center;
      margin: 25px 0;
    }
    .airport {
      text-align: center;
    }
    .airport-code {
      font-size: 32px;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 5px;
    }
    .airport-city {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 8px;
    }
    .airport-time {
      font-size: 18px;
      font-weight: 600;
      color: #1f2937;
    }
    .airport-date {
      font-size: 12px;
      color: #9ca3af;
    }
    .route-line {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
    }
    .route-duration {
      font-size: 14px;
      color: #6b7280;
      font-weight: 500;
    }
    .route-arrow {
      width: 60px;
      height: 2px;
      background: #d1d5db;
      position: relative;
    }
    .route-arrow::after {
      content: '';
      position: absolute;
      right: -6px;
      top: -4px;
      width: 0;
      height: 0;
      border-left: 8px solid #d1d5db;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
    }
    .passenger-section {
      background: #f9fafb;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
    }
    .section-title {
      font-size: 16px;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 15px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .passenger-details {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }
    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    .detail-label {
      font-size: 12px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .detail-value {
      font-size: 15px;
      font-weight: 500;
      color: #1f2937;
    }
    .ancillaries-section {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
    }
    .ancillaries-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 10px;
    }
    .ancillary-badge {
      background: #e0e7ff;
      color: #4338ca;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
    }
    .price-breakdown {
      background: #f9fafb;
      border-radius: 8px;
      padding: 20px;
      margin-top: 20px;
    }
    .price-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      font-size: 14px;
    }
    .price-row.total {
      border-top: 2px solid #e5e7eb;
      margin-top: 10px;
      padding-top: 15px;
      font-size: 18px;
      font-weight: 700;
      color: #1f2937;
    }
    .price-label {
      color: #6b7280;
    }
    .price-value {
      font-weight: 600;
      color: #1f2937;
    }
    .ticket-footer {
      background: #f9fafb;
      padding: 20px 30px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }
    .footer-text {
      font-size: 12px;
      color: #6b7280;
      line-height: 1.6;
    }
    .barcode {
      margin-top: 15px;
      padding: 15px;
      background: white;
      border-radius: 6px;
      display: inline-block;
    }
    .barcode-text {
      font-family: 'Courier New', monospace;
      font-size: 24px;
      letter-spacing: 3px;
      font-weight: 700;
      color: #1f2937;
    }
    @media print {
      body {
        background: white;
        padding: 0;
      }
      .ticket {
        box-shadow: none;
      }
    }
  </style>
</head>
<body>
  <div class="ticket">
    <div class="ticket-header">
      <h1>FLIGHT TICKET</h1>
      <div class="booking-info">
        <div>
          <strong>Booking ID:</strong> ${a.bookingId}
        </div>
        <div>
          <strong>PNR:</strong> ${a.pnr}
        </div>
      </div>
    </div>
    
    <div class="ticket-body">
      <div class="flight-section">
        <div class="flight-header">
          <div>
            <div class="airline-name">${a.flight.airline}</div>
            <div class="flight-number">Flight ${a.flight.flightNumber}</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 12px; color: #6b7280;">Booking Date</div>
            <div style="font-size: 16px; font-weight: 600; color: #1f2937;">
              ${t(a.bookingDate)}
            </div>
          </div>
        </div>
        
        <div class="route-info">
          <div class="airport">
            <div class="airport-code">${a.flight.departure.code}</div>
            <div class="airport-city">${a.flight.departure.city}</div>
            <div class="airport-time">${s(a.flight.departure.time)}</div>
            <div class="airport-date">${t(a.flight.departure.time)}</div>
          </div>
          
          <div class="route-line">
            <div class="route-duration">${a.flight.duration}</div>
            <div class="route-arrow"></div>
          </div>
          
          <div class="airport">
            <div class="airport-code">${a.flight.arrival.code}</div>
            <div class="airport-city">${a.flight.arrival.city}</div>
            <div class="airport-time">${s(a.flight.arrival.time)}</div>
            <div class="airport-date">${t(a.flight.arrival.time)}</div>
          </div>
        </div>
      </div>
      
      <div class="passenger-section">
        <div class="section-title">Passenger Information</div>
        <div class="passenger-details">
          <div class="detail-item">
            <div class="detail-label">Passenger Name</div>
            <div class="detail-value">${a.passenger.firstName}${a.passenger.lastName?` ${a.passenger.lastName}`:""}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Date of Birth</div>
            <div class="detail-value">${t(a.passenger.dob)}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Gender</div>
            <div class="detail-value">${a.passenger.gender.charAt(0).toUpperCase()+a.passenger.gender.slice(1)}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Mobile</div>
            <div class="detail-value">${a.passenger.mobile}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Email</div>
            <div class="detail-value">${a.passenger.email}</div>
          </div>
          ${a.passenger.passport?`
          <div class="detail-item">
            <div class="detail-label">Passport</div>
            <div class="detail-value">${a.passenger.passport}</div>
          </div>
          `:""}
          <div class="detail-item">
            <div class="detail-label">Travelers</div>
            <div class="detail-value">
              ${a.passengerCount.adults} Adult${1!==a.passengerCount.adults?"s":""}
              ${a.passengerCount.children>0?`, ${a.passengerCount.children} Child${1!==a.passengerCount.children?"ren":""}`:""}
              ${a.passengerCount.infants>0?`, ${a.passengerCount.infants} Infant${1!==a.passengerCount.infants?"s":""}`:""}
            </div>
          </div>
        </div>
        
        ${a.ancillaries&&(a.ancillaries.extraBaggage||a.ancillaries.mealSelection||a.ancillaries.seatSelection)?`
        <div class="ancillaries-section">
          <div class="section-title">Selected Ancillaries</div>
          <div class="ancillaries-list">
            ${a.ancillaries.extraBaggage?'<span class="ancillary-badge">Extra Baggage</span>':""}
            ${a.ancillaries.mealSelection?'<span class="ancillary-badge">Meal Selection</span>':""}
            ${a.ancillaries.seatSelection?'<span class="ancillary-badge">Seat Selection</span>':""}
          </div>
        </div>
        `:""}
      </div>
      
      <div class="price-breakdown">
        <div class="section-title">Price Breakdown</div>
        <div class="price-row">
          <span class="price-label">Base Fare</span>
          <span class="price-value">₹${(a.totalAmount-3750-r).toLocaleString("en-IN")}</span>
        </div>
        <div class="price-row">
          <span class="price-label">Taxes & Fees</span>
          <span class="price-value">₹3,750</span>
        </div>
        ${r>0?`
        <div class="price-row">
          <span class="price-label">Ancillaries</span>
          <span class="price-value">₹${r.toLocaleString("en-IN")}</span>
        </div>
        `:""}
        <div class="price-row total">
          <span class="price-label">Total Amount</span>
          <span class="price-value">₹${a.totalAmount.toLocaleString("en-IN")}</span>
        </div>
      </div>
    </div>
    
    <div class="ticket-footer">
      <div class="barcode">
        <div class="barcode-text">${a.pnr}</div>
      </div>
      <div class="footer-text">
        <p><strong>Important:</strong> Please arrive at the airport at least 2 hours before departure for domestic flights and 3 hours for international flights.</p>
        <p style="margin-top: 10px;">This is an electronic ticket. Please carry a valid ID proof and this ticket (digital or printed) to the airport.</p>
        <p style="margin-top: 10px; color: #9ca3af;">For any queries, contact support at support@makemove.com or call +91-1800-XXX-XXXX</p>
      </div>
    </div>
  </div>
</body>
</html>
  `],{type:"text/html"}),n=URL.createObjectURL(l),(o=document.createElement("a")).href=n,o.download=`Flight-Ticket-${e.bookingId}.html`,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(n),(d=window.open("","_blank"))&&(d.document.write(i),d.document.close(),setTimeout(()=>{d.print()},250)),el.toast.success("Ticket downloaded",{description:"Your flight ticket has been downloaded and opened for printing."})}else el.toast.error("Ticket data not available",{description:"Please complete the booking to download the ticket."})},children:"Download Ticket"}),(0,a.jsx)(r.Button,{onClick:()=>window.location.href="/dashboard",children:"Return to Dashboard"})]})]})]})}e.s(["default",()=>eu],74630)}]);