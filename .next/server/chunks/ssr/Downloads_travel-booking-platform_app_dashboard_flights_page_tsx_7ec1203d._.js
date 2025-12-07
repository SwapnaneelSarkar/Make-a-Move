module.exports=[76296,a=>{"use strict";var b=a.i(89152),c=a.i(7810),d=a.i(15069),e=a.i(19932),f=a.i(7185),g=a.i(31149),h=a.i(17693),i=a.i(10165),j=a.i(98794),k=a.i(59149),l=a.i(59231),m=a.i(24684),n=a.i(36836),o=a.i(59978),p=a.i(54494),q=a.i(86364);let r=(0,q.default)("Minus",[["path",{d:"M5 12h14",key:"1ays0h"}]]),s=(0,q.default)("ArrowLeftRight",[["path",{d:"M8 3 4 7l4 4",key:"9rb6wj"}],["path",{d:"M4 7h16",key:"6tx8e3"}],["path",{d:"m16 21 4-4-4-4",key:"siv7j2"}],["path",{d:"M20 17H4",key:"h6l3hr"}]]);var t=a.i(3558),u=a.i(3144),v=a.i(41686),w=a.i(96435),x=a.i(88139),y=a.i(73743),z=a.i(42570),A=a.i(44965),B=c.forwardRef((a,c)=>{let{pressed:d,defaultPressed:e=!1,onPressedChange:f,...g}=a,[h=!1,i]=(0,A.useControllableState)({prop:d,onChange:f,defaultProp:e});return(0,b.jsx)(x.Primitive.button,{type:"button","aria-pressed":h,"data-state":h?"on":"off","data-disabled":a.disabled?"":void 0,...g,ref:c,onClick:(0,z.composeEventHandlers)(a.onClick,()=>{a.disabled||i(!h)})})});B.displayName="Toggle";var C=a.i(63383),D="ToggleGroup",[E,F]=(0,w.createContextScope)(D,[y.createRovingFocusGroupScope]),G=(0,y.createRovingFocusGroupScope)(),H=c.default.forwardRef((a,c)=>{let{type:d,...e}=a;if("single"===d)return(0,b.jsx)(K,{...e,ref:c});if("multiple"===d)return(0,b.jsx)(L,{...e,ref:c});throw Error(`Missing prop \`type\` expected on \`${D}\``)});H.displayName=D;var[I,J]=E(D),K=c.default.forwardRef((a,d)=>{let{value:e,defaultValue:f,onValueChange:g=()=>{},...h}=a,[i,j]=(0,A.useControllableState)({prop:e,defaultProp:f,onChange:g});return(0,b.jsx)(I,{scope:a.__scopeToggleGroup,type:"single",value:i?[i]:[],onItemActivate:j,onItemDeactivate:c.default.useCallback(()=>j(""),[j]),children:(0,b.jsx)(O,{...h,ref:d})})}),L=c.default.forwardRef((a,d)=>{let{value:e,defaultValue:f,onValueChange:g=()=>{},...h}=a,[i=[],j]=(0,A.useControllableState)({prop:e,defaultProp:f,onChange:g}),k=c.default.useCallback(a=>j((b=[])=>[...b,a]),[j]),l=c.default.useCallback(a=>j((b=[])=>b.filter(b=>b!==a)),[j]);return(0,b.jsx)(I,{scope:a.__scopeToggleGroup,type:"multiple",value:i,onItemActivate:k,onItemDeactivate:l,children:(0,b.jsx)(O,{...h,ref:d})})});H.displayName=D;var[M,N]=E(D),O=c.default.forwardRef((a,c)=>{let{__scopeToggleGroup:d,disabled:e=!1,rovingFocus:f=!0,orientation:g,dir:h,loop:i=!0,...j}=a,k=G(d),l=(0,C.useDirection)(h),m={role:"group",dir:l,...j};return(0,b.jsx)(M,{scope:d,rovingFocus:f,disabled:e,children:f?(0,b.jsx)(y.Root,{asChild:!0,...k,orientation:g,dir:l,loop:i,children:(0,b.jsx)(x.Primitive.div,{...m,ref:c})}):(0,b.jsx)(x.Primitive.div,{...m,ref:c})})}),P="ToggleGroupItem",Q=c.default.forwardRef((a,d)=>{let e=J(P,a.__scopeToggleGroup),f=N(P,a.__scopeToggleGroup),g=G(a.__scopeToggleGroup),h=e.value.includes(a.value),i=f.disabled||a.disabled,j={...a,pressed:h,disabled:i},k=c.default.useRef(null);return f.rovingFocus?(0,b.jsx)(y.Item,{asChild:!0,...g,focusable:!i,active:h,ref:k,children:(0,b.jsx)(R,{...j,ref:d})}):(0,b.jsx)(R,{...j,ref:d})});Q.displayName=P;var R=c.default.forwardRef((a,c)=>{let{__scopeToggleGroup:d,value:e,...f}=a,g=J(P,d),h={role:"radio","aria-checked":a.pressed,"aria-pressed":void 0},i="single"===g.type?h:void 0;return(0,b.jsx)(B,{...i,...f,ref:c,onPressedChange:a=>{a?g.onItemActivate(e):g.onItemDeactivate(e)}})});let S=(0,a.i(91475).cva)("inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",{variants:{variant:{default:"bg-transparent",outline:"border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground"},size:{default:"h-9 px-2 min-w-9",sm:"h-8 px-1.5 min-w-8",lg:"h-10 px-2.5 min-w-10"}},defaultVariants:{variant:"default",size:"default"}}),T=c.createContext({size:"default",variant:"default"});function U({className:a,variant:c,size:d,children:e,...f}){return(0,b.jsx)(H,{"data-slot":"toggle-group","data-variant":c,"data-size":d,className:(0,u.cn)("group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs",a),...f,children:(0,b.jsx)(T.Provider,{value:{variant:c,size:d},children:e})})}function V({className:a,children:d,variant:e,size:f,...g}){let h=c.useContext(T);return(0,b.jsx)(Q,{"data-slot":"toggle-group-item","data-variant":h.variant||e,"data-size":h.size||f,className:(0,u.cn)(S({variant:h.variant||e,size:h.size||f}),"min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",a),...g,children:d})}var W=a.i(39241);let X=[{value:"DEL",label:"New Delhi (DEL)"},{value:"BOM",label:"Mumbai (BOM)"},{value:"BLR",label:"Bangalore (BLR)"},{value:"MAA",label:"Chennai (MAA)"},{value:"CCU",label:"Kolkata (CCU)"},{value:"HYD",label:"Hyderabad (HYD)"}],Y=[...X,{value:"DXB",label:"Dubai (DXB)"},{value:"LHR",label:"London Heathrow (LHR)"},{value:"SIN",label:"Singapore (SIN)"},{value:"JFK",label:"New York (JFK)"},{value:"FRA",label:"Frankfurt (FRA)"},{value:"SYD",label:"Sydney (SYD)"}];function Z({tripType:a="one-way",origin:d="",destination:q="",departureDate:w=null,returnDate:x=null,travellers:y="1",class:z="Economy",specialFare:A="Regular",flightType:B="domestic",onTripTypeChange:C,onOriginChange:D,onDestinationChange:E,onDepartureDateChange:F,onReturnDateChange:G,onTravellersChange:H,onClassChange:I,onSpecialFareChange:J,onFlightTypeChange:K,onSearch:L,errors:M={}}){let[N,O]=(0,c.useState)(B);(0,c.useEffect)(()=>{let a=localStorage.getItem("flight_search_type");a&&(O(a),K?.(a))},[K]),(0,c.useEffect)(()=>{let a="domestic"===N?X:Y;d&&!a.some(a=>a.value===d)&&D?.(""),q&&!a.some(a=>a.value===q)&&E?.("")},[N,d,q,D,E]);let P="domestic"===N?X:Y,Q=!d||!q,R=Math.max(1,parseInt(y||"1")||1),S=a.replace("-"," ");return(0,b.jsx)(f.Card,{className:"border-2 bg-gradient-to-br from-background via-background to-primary/5 p-5 md:p-6 shadow-lg",children:(0,b.jsxs)("div",{className:"grid gap-4",children:[(0,b.jsxs)("div",{className:"flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",children:[(0,b.jsxs)(i.RadioGroup,{value:a,onValueChange:C,className:"flex gap-4",children:[(0,b.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,b.jsx)(i.RadioGroupItem,{value:"one-way",id:"one-way"}),(0,b.jsx)(g.Label,{htmlFor:"one-way",className:"font-medium cursor-pointer",children:"One Way"})]}),(0,b.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,b.jsx)(i.RadioGroupItem,{value:"round-trip",id:"round-trip"}),(0,b.jsx)(g.Label,{htmlFor:"round-trip",className:"font-medium cursor-pointer",children:"Round Trip"})]}),(0,b.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,b.jsx)(i.RadioGroupItem,{value:"multi-city",id:"multi-city",disabled:!0}),(0,b.jsx)(g.Label,{htmlFor:"multi-city",className:"text-muted-foreground cursor-not-allowed",children:"Multi City"})]})]}),(0,b.jsxs)(U,{type:"single",value:N,onValueChange:a=>{("domestic"===a||"international"===a)&&(O(a),localStorage.setItem("flight_search_type",a),K?.(a))},className:"border-2",children:[(0,b.jsxs)(V,{value:"domestic","aria-label":"Domestic",className:"data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",children:[(0,b.jsx)(o.MapPin,{className:"mr-2 h-4 w-4"}),"Domestic"]}),(0,b.jsxs)(V,{value:"international","aria-label":"International",className:"data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",children:[(0,b.jsx)(n.Globe,{className:"mr-2 h-4 w-4"}),"International"]})]})]}),(0,b.jsxs)("div",{className:"flex flex-wrap items-center gap-2.5 rounded-2xl border bg-muted/60 px-4 py-2.5 text-sm",children:[(0,b.jsx)(W.Badge,{variant:"secondary",className:"uppercase tracking-wide",children:"domestic"===N?"Domestic Network":"International Network"}),(0,b.jsx)("span",{className:"text-muted-foreground",children:"domestic"===N?"Fastest routes across major Indian cities with policy-friendly fares.":"Passport details required. Popular international hubs pre-loaded for quick search."})]}),(0,b.jsxs)("div",{className:(0,u.cn)("grid gap-2 md:gap-3","round-trip"===a?"md:grid-cols-[1.2fr_auto_1.2fr_1fr_1fr]":"md:grid-cols-[1.3fr_auto_1.3fr_1fr]"),children:[(0,b.jsxs)("div",{className:"space-y-2",children:[(0,b.jsxs)(g.Label,{className:"text-sm font-semibold",children:["From ",(0,b.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,b.jsxs)(v.Select,{value:d,onValueChange:D,children:[(0,b.jsx)(v.SelectTrigger,{className:(0,u.cn)("h-11 transition-all hover:border-primary/50",M.origin&&"border-red-500"),children:(0,b.jsx)(v.SelectValue,{placeholder:"Select Airport"})}),(0,b.jsx)(v.SelectContent,{children:P.map(a=>(0,b.jsx)(v.SelectItem,{value:a.value,children:a.label},a.value))})]}),M.origin&&(0,b.jsx)("p",{className:"text-xs text-red-500",children:M.origin})]}),(0,b.jsxs)("div",{className:"flex flex-col items-center gap-1.5 md:mt-5",children:[(0,b.jsxs)(e.Button,{type:"button",variant:"secondary",onClick:()=>{Q||(D?.(q),E?.(d))},disabled:Q,className:"h-10 w-full md:w-11 md:h-11 rounded-full shadow-sm flex items-center justify-center px-4",children:[(0,b.jsx)(s,{className:"h-4 w-4"}),(0,b.jsx)("span",{className:"ml-2 text-xs font-semibold md:hidden",children:"Swap"})]}),(0,b.jsx)("p",{className:"text-center text-xs text-muted-foreground hidden md:block",children:"Swap"})]}),(0,b.jsxs)("div",{className:"space-y-2",children:[(0,b.jsxs)(g.Label,{className:"text-sm font-semibold",children:["To ",(0,b.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,b.jsxs)(v.Select,{value:q,onValueChange:E,children:[(0,b.jsx)(v.SelectTrigger,{className:(0,u.cn)("h-11 transition-all hover:border-primary/50",M.destination&&"border-red-500"),children:(0,b.jsx)(v.SelectValue,{placeholder:"Select Airport"})}),(0,b.jsx)(v.SelectContent,{children:P.map(a=>(0,b.jsx)(v.SelectItem,{value:a.value,children:a.label},a.value))})]}),M.destination&&(0,b.jsx)("p",{className:"text-xs text-red-500",children:M.destination})]}),(0,b.jsxs)("div",{className:"space-y-2",children:[(0,b.jsxs)(g.Label,{className:"text-sm font-semibold",children:["Departure Date ",(0,b.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,b.jsxs)(j.Popover,{children:[(0,b.jsx)(j.PopoverTrigger,{asChild:!0,children:(0,b.jsxs)(e.Button,{variant:"outline",className:(0,u.cn)("h-11 w-full justify-start text-left font-normal transition-all hover:border-primary/50",!w&&"text-muted-foreground",M.departureDate&&"border-red-500"),children:[(0,b.jsx)(l.CalendarIcon,{className:"mr-2 h-4 w-4"}),w?(0,t.format)(w,"PPP"):(0,b.jsx)("span",{children:"Pick a date"})]})}),(0,b.jsx)(j.PopoverContent,{className:"w-auto p-0",children:(0,b.jsx)(k.Calendar,{mode:"single",selected:w||void 0,onSelect:a=>F?.(a||null),initialFocus:!0,disabled:a=>a<new Date(new Date().setHours(0,0,0,0))})})]}),M.departureDate&&(0,b.jsx)("p",{className:"text-xs text-red-500",children:M.departureDate})]}),"round-trip"===a&&(0,b.jsxs)("div",{className:"space-y-2",children:[(0,b.jsxs)(g.Label,{className:"text-sm font-semibold",children:["Return Date ",(0,b.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,b.jsxs)(j.Popover,{children:[(0,b.jsx)(j.PopoverTrigger,{asChild:!0,children:(0,b.jsxs)(e.Button,{variant:"outline",className:(0,u.cn)("h-11 w-full justify-start text-left font-normal transition-all hover:border-primary/50",!x&&"text-muted-foreground",M.returnDate&&"border-red-500"),children:[(0,b.jsx)(l.CalendarIcon,{className:"mr-2 h-4 w-4"}),x?(0,t.format)(x,"PPP"):(0,b.jsx)("span",{children:"Pick a date"})]})}),(0,b.jsx)(j.PopoverContent,{className:"w-auto p-0",children:(0,b.jsx)(k.Calendar,{mode:"single",selected:x||void 0,onSelect:a=>G?.(a||null),initialFocus:!0,disabled:a=>a<new Date(new Date().setHours(0,0,0,0))||!!w&&a<=w})})]}),M.returnDate&&(0,b.jsx)("p",{className:"text-xs text-red-500",children:M.returnDate})]})]}),(0,b.jsxs)("div",{className:"grid gap-3 md:grid-cols-3",children:[(0,b.jsxs)("div",{className:"space-y-2",children:[(0,b.jsxs)(g.Label,{className:"text-sm font-semibold",children:["Passengers ",(0,b.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,b.jsxs)("div",{className:"flex items-center gap-2",children:[(0,b.jsx)(e.Button,{type:"button",variant:"outline",size:"icon",onClick:()=>{let a=Math.max(1,(parseInt(y)||1)-1);H?.(a.toString())},disabled:1>=parseInt(y),className:"h-11 w-11 transition-all hover:border-primary/50",children:(0,b.jsx)(r,{className:"h-4 w-4"})}),(0,b.jsx)(h.Input,{type:"number",min:"1",max:"20",value:y,onChange:a=>{let b=a.target.value;(""===b||parseInt(b)>=1&&20>=parseInt(b))&&H?.(b||"1")},className:"h-11 text-center w-20 font-semibold"}),(0,b.jsx)(e.Button,{type:"button",variant:"outline",size:"icon",onClick:()=>{let a=Math.min(20,(parseInt(y)||1)+1);H?.(a.toString())},disabled:parseInt(y)>=20,className:"h-11 w-11 transition-all hover:border-primary/50",children:(0,b.jsx)(p.Plus,{className:"h-4 w-4"})})]}),(0,b.jsx)("p",{className:"text-xs text-muted-foreground",children:"1-20 passengers"})]}),(0,b.jsxs)("div",{className:"space-y-2",children:[(0,b.jsxs)(g.Label,{className:"text-sm font-semibold",children:["Class ",(0,b.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,b.jsxs)(v.Select,{value:z,onValueChange:I,children:[(0,b.jsx)(v.SelectTrigger,{className:"h-11 transition-all hover:border-primary/50",children:(0,b.jsx)(v.SelectValue,{placeholder:"Select Class"})}),(0,b.jsxs)(v.SelectContent,{children:[(0,b.jsx)(v.SelectItem,{value:"Economy",children:"Economy"}),(0,b.jsx)(v.SelectItem,{value:"Premium",children:"Premium Economy"}),(0,b.jsx)(v.SelectItem,{value:"Business",children:"Business"})]})]})]}),(0,b.jsxs)("div",{className:"space-y-2",children:[(0,b.jsxs)(g.Label,{className:"text-sm font-semibold",children:["Special Fare ",(0,b.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,b.jsxs)(v.Select,{value:A,onValueChange:J,children:[(0,b.jsx)(v.SelectTrigger,{className:"h-11 transition-all hover:border-primary/50",children:(0,b.jsx)(v.SelectValue,{placeholder:"Select Fare Type"})}),(0,b.jsxs)(v.SelectContent,{children:[(0,b.jsx)(v.SelectItem,{value:"Regular",children:"Regular"}),(0,b.jsx)(v.SelectItem,{value:"Deals",children:"Deals"}),(0,b.jsx)(v.SelectItem,{value:"Student",children:"Student"}),(0,b.jsx)(v.SelectItem,{value:"Senior",children:"Senior"}),(0,b.jsx)(v.SelectItem,{value:"Armed Forces",children:"Armed Forces"}),(0,b.jsx)(v.SelectItem,{value:"SOTO",children:"SOTO"})]})]})]})]}),(0,b.jsx)("div",{className:"flex justify-end pt-2",children:(0,b.jsxs)(e.Button,{size:"lg",className:"w-full md:w-auto min-w-[180px] bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200 font-semibold text-base h-11",onClick:L,children:[(0,b.jsx)(m.Search,{className:"mr-2 h-5 w-5"}),"Search Flights"]})}),(0,b.jsxs)("div",{className:"grid gap-3 md:grid-cols-3 pt-2 text-sm",children:[(0,b.jsxs)("div",{className:"rounded-2xl border bg-background/80 p-3.5 shadow-sm",children:[(0,b.jsx)("p",{className:"text-xs uppercase tracking-wide text-muted-foreground",children:"Trip Type"}),(0,b.jsx)("p",{className:"text-base font-semibold capitalize mt-1",children:S}),(0,b.jsx)("p",{className:"text-xs text-muted-foreground mt-1",children:"round-trip"===a?"Return date enabled":"One-way itinerary"})]}),(0,b.jsxs)("div",{className:"rounded-2xl border bg-background/80 p-3.5 shadow-sm",children:[(0,b.jsx)("p",{className:"text-xs uppercase tracking-wide text-muted-foreground",children:"Passengers"}),(0,b.jsxs)("p",{className:"text-base font-semibold mt-1",children:[R," traveler",1!==R?"s":""]}),(0,b.jsxs)("p",{className:"text-xs text-muted-foreground mt-1",children:["Cabin: ",z]})]}),(0,b.jsxs)("div",{className:"rounded-2xl border bg-background/80 p-3.5 shadow-sm",children:[(0,b.jsx)("p",{className:"text-xs uppercase tracking-wide text-muted-foreground",children:"Special Fare"}),(0,b.jsx)("p",{className:"text-base font-semibold mt-1",children:A}),(0,b.jsx)("p",{className:"text-xs text-muted-foreground mt-1",children:"international"===N?"Passport details captured later":"In-policy fares highlighted"})]})]})]})})}var $=a.i(90459),_=a.i(83571),aa=a.i(53420),ab=a.i(49772),ac=a.i(93928),ad=a.i(75855),ae=a.i(24160),af=a.i(43687),ag=a.i(9564),ah=a.i(25006),ai=a.i(80895),aj=a.i(99290),ak=a.i(57809),al=a.i(93103);let am=[{id:"Search",label:"Search"},{id:"Listing",label:"Listing"},{id:"Fare Review",label:"Fare Review"},{id:"Passenger Details",label:"Passenger Details"},{id:"Ancillaries",label:"Ancillaries"},{id:"Payment Pending",label:"Payment Pending"},{id:"Booking Confirmed",label:"Booking Confirmed"}];function an(){let a=(0,d.useRouter)(),f=(0,d.useSearchParams)(),{currentUser:i}=(0,af.useAppStore)(),j="SUPER_ADMIN"===i.role,k=f.get("selectedFlight"),[l,m]=(0,c.useState)("Search"),[n,o]=(0,c.useState)(null),[p,q]=(0,c.useState)((0,ak.generateBookingId)()),[r,s]=(0,c.useState)(""),[t,v]=(0,c.useState)({tripType:"one-way",origin:"",destination:"",departureDate:null,returnDate:null,travellers:"1",class:"Economy",specialFare:"Regular"}),[w,x]=(0,c.useState)(!1),[y,z]=(0,c.useState)({}),[A,B]=(0,c.useState)(null),[C,D]=(0,c.useState)(!1),[E,F]=(0,c.useState)(null),[G,H]=(0,c.useState)({adults:1,children:0,infants:0}),[I,J]=(0,c.useState)({firstName:"",lastName:"",dob:"",gender:"",mobile:"",email:"",gst:"",passport:"",passportExpiry:""}),[K,L]=(0,c.useState)({extraBaggage:!1,extraBaggagePrice:1500,mealSelection:!1,mealPrice:1200,seatSelection:!1,seatPrice:800}),[M,N]=(0,c.useState)({paymentMethod:"",payableAmount:0,walletUsage:!1,acceptTerms:!1}),[O,P]=(0,c.useState)(null),Q=(0,c.useRef)(null),R=(0,c.useRef)(null),[S,T]=(0,c.useState)({});(0,c.useEffect)(()=>{if(k){let b=$.MOCK_FLIGHTS.find(a=>a.id===k);if(b){o(b),B({selectedFlight:b.id,fareType:"Standard",airline:b.airline,time:b.departure.time,price:b.price.toString()});let c=f.get("origin"),d=f.get("destination"),e=f.get("departureDate"),g=f.get("returnDate"),h=f.get("travellers"),i=f.get("class"),j=f.get("tripType"),k="true"===f.get("isInternational");c&&v(a=>({...a,origin:c})),d&&v(a=>({...a,destination:d})),e&&v(a=>({...a,departureDate:new Date(e)})),g&&v(a=>({...a,returnDate:new Date(g)})),h&&v(a=>({...a,travellers:h})),i&&v(a=>({...a,class:i})),j&&v(a=>({...a,tripType:j})),x(k);let l=new Date(e||b.departure.time);F((0,ak.checkFlightPolicyCompliance)(b.price,i||"Economy",l,k)),m("Fare Review"),R.current=Date.now(),D(!1);let n=new URLSearchParams(f.toString());n.delete("selectedFlight"),a.replace(`/dashboard/flights?${n.toString()}`)}}},[k,a,f]),(0,c.useEffect)(()=>{if("Payment Pending"===l&&R.current){let a=()=>{let a=Math.max(0,15-(Date.now()-R.current)/1e3/60);P(Math.ceil(a)),a<=0&&(Q.current&&(clearInterval(Q.current),Q.current=null),ag.toast.error("Payment session expired",{description:"The booking session has expired. Please start a new search."}),m("Search"))};return a(),Q.current=setInterval(a,1e3),()=>{Q.current&&(clearInterval(Q.current),Q.current=null)}}P(null)},[l]);let U=()=>am.findIndex(a=>a.id===l),V=a=>{let b=new Date(a),c=new Date,d=c.getFullYear()-b.getFullYear(),e=c.getMonth()-b.getMonth();return(e<0||0===e&&c.getDate()<b.getDate())&&d--,d},X=async()=>{let a=U();if(-1===a||a>=am.length-1)return;let b=am[a+1].id,c=(0,ah.canTransitionStage)("FLIGHT",l,b);if(!c.allowed)return void ag.toast.error("Cannot skip stages",{description:c.reason});let d={};if("Listing"===l){if(!n||!A)return void ag.toast.error("Please select a flight to continue",{description:"Click on a flight card to select it before proceeding."});d=A}else if("Fare Review"===l){if(!C)return void ag.toast.error("Please accept the fare rules to continue",{description:"You must accept the fare terms before proceeding"});d={fareAccepted:!0}}else if("Passenger Details"===l){let a;if(a=G.adults+G.children+G.infants,G.adults<1?(ag.toast.error("At least 1 adult passenger is required"),!0):G.adults>20?(ag.toast.error("Maximum 20 adult passengers allowed per booking"),!0):G.children>19?(ag.toast.error("Maximum 19 children allowed per booking"),!0):G.infants>G.adults?(ag.toast.error("Number of infants cannot exceed number of adults"),!0):a>20?(ag.toast.error("Maximum 20 passengers allowed per booking"),!0):a<1&&(ag.toast.error("At least 1 passenger is required"),!0))return;if(!(()=>{let a={};if(I.firstName?I.firstName.length<2?a.firstName="First name must be at least 2 characters":/^[a-zA-Z\s]+$/.test(I.firstName)||(a.firstName="First name can only contain alphabets and spaces"):a.firstName="First name is required",I.lastName&&I.lastName.length>0&&!/^[a-zA-Z\s]+$/.test(I.lastName)&&(a.lastName="Last name can only contain alphabets and spaces"),I.dob?isNaN(new Date(I.dob).getTime())?a.dob="Please enter a valid date":0>V(I.dob)&&(a.dob="Date of Birth cannot be in the future"):a.dob="Date of Birth is required",I.gender||(a.gender="Gender is required"),I.mobile){let b=I.mobile.replace(/\D/g,"");10!==b.length?a.mobile="Mobile number must be 10 digits":/^[6-9]/.test(b)||(a.mobile="Mobile number must start with 6, 7, 8, or 9")}else a.mobile="Mobile number is required";if(I.email?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(I.email)||(a.email="Please enter a valid email address"):a.email="Email is required",w)if(I.passport?/^[A-Z]{1}[0-9]{7}$/.test(I.passport.toUpperCase())||(a.passport="Passport number must be 1 letter followed by 7 digits (e.g., A1234567)"):a.passport="Passport number is required for international flights",I.passportExpiry){let b=new Date(I.passportExpiry),c=new Date;c.setHours(0,0,0,0),isNaN(b.getTime())?a.passportExpiry="Please enter a valid expiry date":b<=c&&(a.passportExpiry="Passport expiry date must be in the future")}else a.passportExpiry="Passport expiry date is required for international flights";return T(a),0===Object.keys(a).length})())return void ag.toast.error("Please fill all passenger details");d={...I,passengerCount:G}}else if("Ancillaries"===l)d={ancillaries:K};else if("Payment Pending"===l){if(!M.paymentMethod)return void ag.toast.error("Please select payment method");if(!M.acceptTerms)return void ag.toast.error("Please accept terms and conditions");let a=(K.extraBaggage?K.extraBaggagePrice:0)+(K.mealSelection?K.mealPrice:0)+(K.seatSelection?K.seatPrice:0),b=n?n.price+3750+a:0;if(M.walletUsage){let a=(0,al.getWalletBalance)();if(!(0,al.hasSufficientBalance)(b))return void ag.toast.error("Insufficient wallet balance",{description:`Wallet balance (₹${a.toLocaleString("en-IN")}) is less than total amount (₹${b.toLocaleString("en-IN")}). Please add funds to continue.`,action:{label:"Add Funds",onClick:()=>{window.location.href="/dashboard/wallet"}}})}if(R.current&&(Date.now()-R.current)/1e3/60>15){ag.toast.error("Payment timeout",{description:"The booking session has expired. Please start a new search."}),m("Search");return}d={...M,payableAmount:b}}let e=(0,ah.transitionStage)("FLIGHT",p,l,b,d,i.id);if(e.success){if(m(b),"Booking Confirmed"===b){let a=(0,ak.generateBookingId)(),b=(0,ak.generatePNR)();q(a),s(b);try{let c=await ai.bookingsDB.create({type:"FLIGHT",status:E?.requiresApproval?"PENDING_APPROVAL":"CONFIRMED",details:{...n,bookingId:a,pnr:b,passengerDetails:I,passengerCount:G,ancillaries:K,policyCompliant:E?.compliant??!0},date:new Date().toISOString().split("T")[0],amount:n?.price||0,agentName:i.name,agentId:i.id,approvalStatus:E?.requiresApproval?"PENDING":"APPROVED"});if(M.walletUsage&&n){let a=(K.extraBaggage?K.extraBaggagePrice:0)+(K.mealSelection?K.mealPrice:0)+(K.seatSelection?K.seatPrice:0),b=n.price+3750+a;await (0,al.createTransaction)({date:new Date().toISOString().split("T")[0],description:`Flight Booking ${c.bookingId}`,amount:-b,type:"DEBIT",status:"Completed",paymentMethod:"Wallet",productType:"Flight",bookingId:c.id})}await aj.audit.create("bookings",c.id,{type:"FLIGHT",amount:n?.price||0}),E?.requiresApproval?ag.toast.success("Booking submitted for approval!",{description:`Booking ID: ${a}, PNR: ${b}. Policy violations require approval.`}):ag.toast.success("Booking confirmed!",{description:`Booking ID: ${a}, PNR: ${b}`}),Q.current&&(clearInterval(Q.current),Q.current=null),P(null),R.current=null}catch(a){console.error("Failed to save booking:",a),ag.toast.error("Booking confirmed but failed to save details")}}}else ag.toast.error("Cannot proceed",{description:e.error})};return j?(0,b.jsx)("div",{className:"px-6 py-10",children:(0,b.jsx)("div",{className:"max-w-2xl mx-auto",children:(0,b.jsxs)(ae.Alert,{children:[(0,b.jsxs)(ae.AlertTitle,{className:"flex items-center gap-2",children:[(0,b.jsx)(aa.Lock,{className:"h-4 w-4"}),"Booking access restricted"]}),(0,b.jsx)(ae.AlertDescription,{children:"Super Admins supervise agencies but cannot create flight bookings from this workspace. Switch to an agency role (Agency Admin, Agent, or Sub Agent) to access flight booking tools."})]})})}):(0,b.jsxs)("div",{className:"flex flex-col gap-8",children:[(0,b.jsxs)("div",{className:"space-y-2",children:[(0,b.jsx)("h1",{className:"text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent",children:"Flight Booking"}),(0,b.jsx)("p",{className:"text-lg text-muted-foreground",children:"Search and book flights for your business travel with ease."})]}),(0,b.jsx)("div",{className:"w-full overflow-x-auto pb-4",children:(0,b.jsx)("div",{className:"flex items-center min-w-max gap-2",children:am.map((a,c)=>{let d=U(),e=a.id===l,f=d>c;return(0,b.jsxs)("div",{className:"flex items-center",children:[(0,b.jsxs)("div",{className:(0,u.cn)("flex items-center gap-2 px-4 py-2.5 rounded-full border-2 text-sm font-semibold transition-all duration-200 shadow-sm",e?"bg-primary text-primary-foreground border-primary shadow-md scale-105":f?"bg-primary/10 text-primary border-primary/30":"bg-background text-muted-foreground border-border"),children:[f?(0,b.jsx)(_.CheckCircle2,{className:"w-4 h-4"}):(0,b.jsx)("span",{className:(0,u.cn)("w-5 h-5 rounded-full flex items-center justify-center text-xs",e&&"bg-primary-foreground/20"),children:c+1}),a.label]}),c<am.length-1&&(0,b.jsx)("div",{className:(0,u.cn)("w-12 h-0.5 mx-2 transition-colors",f?"bg-primary":"bg-border")})]},a.id)})})}),(0,b.jsxs)("div",{className:(0,u.cn)("transition-all duration-300","Search"!==l&&"opacity-50 pointer-events-none grayscale"),children:[(0,b.jsxs)("div",{className:"flex items-center gap-2 mb-4",children:["Search"!==l&&(0,b.jsx)(aa.Lock,{className:"w-5 h-5 text-muted-foreground"}),(0,b.jsx)("h2",{className:"text-2xl font-bold",children:"Search Criteria"})]}),(0,b.jsx)(Z,{tripType:t.tripType,origin:t.origin,destination:t.destination,departureDate:t.departureDate,returnDate:t.returnDate,travellers:t.travellers,class:t.class,flightType:w?"international":"domestic",onTripTypeChange:a=>v({...t,tripType:a}),onOriginChange:a=>v({...t,origin:a}),onDestinationChange:a=>v({...t,destination:a}),onDepartureDateChange:a=>v({...t,departureDate:a}),onReturnDateChange:a=>v({...t,returnDate:a}),onTravellersChange:a=>v({...t,travellers:a}),onClassChange:a=>v({...t,class:a}),specialFare:t.specialFare,onSpecialFareChange:a=>v({...t,specialFare:a}),onFlightTypeChange:a=>x("international"===a),onSearch:()=>{let a,b;if(!(()=>{let a={};if(t.origin||(a.origin="Origin is required"),t.destination||(a.destination="Destination is required"),t.origin&&t.destination&&t.origin===t.destination&&(a.destination="Destination cannot be same as origin"),t.departureDate){let b=new Date;b.setHours(0,0,0,0);let c=new Date(t.departureDate);c.setHours(0,0,0,0),c<b&&(a.departureDate="Departure date cannot be in the past")}else a.departureDate="Departure date is required";if("round-trip"===t.tripType)if(t.returnDate){if(t.departureDate){let b=new Date(t.departureDate);new Date(t.returnDate)<=b&&(a.returnDate="Return date must be after departure date")}}else a.returnDate="Return date is required for round-trip";let b=G.adults+G.children+G.infants;return G.adults<1&&(a.passengers="At least 1 adult passenger is required"),b>20&&(a.passengers="Maximum 20 passengers allowed per booking"),z(a),0===Object.keys(a).length})())return void ag.toast.error("Please fix search errors",{description:"Check all required fields and ensure dates are valid"});H({adults:(b=parseInt((a=t.travellers.split("-"))[0])||1,"business"===a[1]?v(a=>({...a,class:"Business"})):"premium"===a[1]&&v(a=>({...a,class:"Premium"})),Math.min(20,Math.max(1,b))),children:0,infants:0});let c={tripType:t.tripType||"one-way",origin:t.origin,destination:t.destination,dates:t.departureDate?.toISOString()||new Date().toISOString(),travellers:t.travellers||"1",class:t.class||"Economy",specialFare:t.specialFare||"Regular"},d=(0,ah.transitionStage)("FLIGHT",p,l,"Listing",c,i.id,"Flight search initiated");if(d.success){let a=new URLSearchParams({origin:t.origin,destination:t.destination,departureDate:t.departureDate?.toISOString()||"",returnDate:t.returnDate?.toISOString()||"",travellers:t.travellers||"1",class:t.class||"Economy",tripType:t.tripType||"one-way",isInternational:w.toString()});window.location.href=`/dashboard/flights/listing?${a.toString()}`}else ag.toast.error("Cannot proceed",{description:d.error})},errors:y})]}),U()>1&&n&&(0,b.jsxs)("div",{className:"border rounded-lg p-4 bg-muted/20 flex items-center justify-between opacity-50 pointer-events-none",children:[(0,b.jsxs)("div",{className:"flex items-center gap-4",children:[(0,b.jsx)(aa.Lock,{className:"w-4 h-4 text-muted-foreground"}),(0,b.jsxs)("div",{children:[(0,b.jsxs)("p",{className:"font-semibold",children:[n.airline," - ",n.flightNumber]}),(0,b.jsxs)("p",{className:"text-sm text-muted-foreground",children:[n.departure.city," to ",n.arrival.city]})]})]}),(0,b.jsx)(e.Button,{variant:"outline",size:"sm",disabled:!0,children:"Selected"})]}),"Fare Review"===l&&n&&(0,b.jsxs)("div",{className:"border-2 rounded-xl p-6 space-y-6 bg-card shadow-lg",children:[(0,b.jsx)("div",{className:"flex items-center gap-2",children:(0,b.jsx)("h3",{className:"text-2xl font-bold",children:"Fare Review"})}),E&&!E.compliant&&("AGENT"===i.role||"SUB_AGENT"===i.role)&&(0,b.jsxs)("div",{className:"bg-gradient-to-r from-yellow-50 to-yellow-100/50 dark:from-yellow-950/20 dark:to-yellow-950/10 border-2 border-yellow-300 dark:border-yellow-800 rounded-xl p-5 space-y-3 shadow-sm",children:[(0,b.jsxs)("div",{className:"flex items-center gap-2 text-yellow-800 dark:text-yellow-200",children:[(0,b.jsx)(ac.AlertCircle,{className:"h-5 w-5"}),(0,b.jsx)("span",{className:"font-bold text-base",children:"Out of Policy - Approval Required"})]}),(0,b.jsx)("ul",{className:"list-disc list-inside text-sm text-yellow-700 dark:text-yellow-300 space-y-1.5 ml-2",children:E.violations.map((a,c)=>(0,b.jsx)("li",{className:"font-medium",children:a},c))})]}),(0,b.jsxs)("div",{className:"grid grid-cols-2 gap-6 bg-muted/30 rounded-xl p-5",children:[(0,b.jsxs)("div",{className:"space-y-1",children:[(0,b.jsx)("p",{className:"text-sm font-medium text-muted-foreground",children:"Base Fare"}),(0,b.jsxs)("p",{className:"text-xl font-bold",children:[n.currency," ",n.price.toLocaleString("en-IN")]})]}),(0,b.jsxs)("div",{className:"space-y-1",children:[(0,b.jsx)("p",{className:"text-sm font-medium text-muted-foreground",children:"Taxes & Fees"}),(0,b.jsx)("p",{className:"text-xl font-bold",children:"₹3,750"})]}),(0,b.jsx)(ad.Separator,{className:"col-span-2 my-2"}),(0,b.jsxs)("div",{className:"col-span-2 flex justify-between items-center pt-2",children:[(0,b.jsx)("span",{className:"text-lg font-bold",children:"Total Amount"}),(0,b.jsxs)("span",{className:"text-2xl font-bold text-primary",children:["₹",(n.price+3750+(K.extraBaggage?K.extraBaggagePrice:0)+(K.mealSelection?K.mealPrice:0)+(K.seatSelection?K.seatPrice:0)).toLocaleString("en-IN")]})]})]}),(0,b.jsxs)("div",{className:"flex items-start gap-2 pt-2",children:[(0,b.jsx)("input",{type:"checkbox",id:"fareAccepted",checked:C,onChange:a=>D(a.target.checked),className:"mt-1 rounded border-gray-300"}),(0,b.jsxs)(g.Label,{htmlFor:"fareAccepted",className:"cursor-pointer text-sm",children:["I accept the fare rules, cancellation policy, and terms & conditions"," ",(0,b.jsx)("span",{className:"text-red-500",children:"*"})]})]}),(0,b.jsx)("div",{className:"flex justify-end pt-2",children:(0,b.jsxs)(e.Button,{onClick:X,disabled:!C,size:"lg",className:"min-w-[200px] font-semibold",children:["Continue to Passenger Details ",(0,b.jsx)(ab.ChevronRight,{className:"w-4 h-4 ml-2"})]})})]}),(0,b.jsxs)("div",{className:(0,u.cn)("border-2 rounded-xl p-6 space-y-6 bg-card shadow-lg transition-all",3>U()?"hidden":U()>3?"opacity-50 pointer-events-none":""),children:[(0,b.jsxs)("div",{className:"flex items-center gap-2 mb-2",children:[U()>3&&(0,b.jsx)(aa.Lock,{className:"w-5 h-5 text-muted-foreground"}),(0,b.jsx)("h3",{className:"text-2xl font-bold",children:"Passenger Details"})]}),(0,b.jsxs)("div",{className:"border-2 rounded-xl p-5 bg-gradient-to-br from-muted/50 to-muted/30 mb-6",children:[(0,b.jsx)(g.Label,{className:"text-lg font-bold mb-4 block",children:"Number of Passengers"}),(0,b.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[(0,b.jsxs)("div",{className:"space-y-2",children:[(0,b.jsxs)(g.Label,{htmlFor:"adults",className:"text-sm",children:["Adults (12+ years) ",(0,b.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,b.jsxs)("div",{className:"flex items-center gap-2",children:[(0,b.jsx)(e.Button,{type:"button",variant:"outline",size:"sm",onClick:()=>H({...G,adults:Math.max(1,G.adults-1)}),disabled:G.adults<=1,children:"-"}),(0,b.jsx)(h.Input,{id:"adults",type:"number",min:"1",max:"20",value:G.adults,onChange:a=>{let b=parseInt(a.target.value)||1;H({...G,adults:Math.min(20,Math.max(1,b))})},className:"text-center"}),(0,b.jsx)(e.Button,{type:"button",variant:"outline",size:"sm",onClick:()=>H({...G,adults:Math.min(20,G.adults+1)}),disabled:G.adults>=20,children:"+"})]}),(0,b.jsx)("p",{className:"text-xs text-muted-foreground",children:"Minimum 1 adult required"})]}),(0,b.jsxs)("div",{className:"space-y-2",children:[(0,b.jsx)(g.Label,{htmlFor:"children",className:"text-sm",children:"Children (2-11 years)"}),(0,b.jsxs)("div",{className:"flex items-center gap-2",children:[(0,b.jsx)(e.Button,{type:"button",variant:"outline",size:"sm",onClick:()=>H({...G,children:Math.max(0,G.children-1)}),disabled:G.children<=0,children:"-"}),(0,b.jsx)(h.Input,{id:"children",type:"number",min:"0",max:"19",value:G.children,onChange:a=>{let b=parseInt(a.target.value)||0;H({...G,children:Math.min(19,Math.max(0,b))})},className:"text-center"}),(0,b.jsx)(e.Button,{type:"button",variant:"outline",size:"sm",onClick:()=>H({...G,children:Math.min(19,G.children+1)}),disabled:G.children>=19,children:"+"})]}),(0,b.jsx)("p",{className:"text-xs text-muted-foreground",children:"Maximum 19 children"})]}),(0,b.jsxs)("div",{className:"space-y-2",children:[(0,b.jsx)(g.Label,{htmlFor:"infants",className:"text-sm",children:"Infants (Under 2 years)"}),(0,b.jsxs)("div",{className:"flex items-center gap-2",children:[(0,b.jsx)(e.Button,{type:"button",variant:"outline",size:"sm",onClick:()=>H({...G,infants:Math.max(0,G.infants-1)}),disabled:G.infants<=0,children:"-"}),(0,b.jsx)(h.Input,{id:"infants",type:"number",min:"0",max:G.adults,value:G.infants,onChange:a=>{let b=parseInt(a.target.value)||0;H({...G,infants:Math.min(G.adults,Math.max(0,b))})},className:"text-center"}),(0,b.jsx)(e.Button,{type:"button",variant:"outline",size:"sm",onClick:()=>H({...G,infants:Math.min(G.adults,G.infants+1)}),disabled:G.infants>=G.adults,children:"+"})]}),(0,b.jsxs)("p",{className:"text-xs text-muted-foreground",children:["Maximum ",G.adults," infant",1!==G.adults?"s":""," (1 per adult)"]})]})]}),(0,b.jsx)("div",{className:"mt-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-950/10 border-2 border-blue-200 dark:border-blue-800 rounded-xl",children:(0,b.jsxs)("p",{className:"text-sm font-semibold text-blue-800 dark:text-blue-200",children:[(0,b.jsx)("strong",{children:"Total Passengers:"})," ",G.adults+G.children+G.infants," ","(",G.adults," adult",1!==G.adults?"s":"",G.children>0&&`, ${G.children} child${1!==G.children?"ren":""}`,G.infants>0&&`, ${G.infants} infant${1!==G.infants?"s":""}`,")"]})})]}),(0,b.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[(0,b.jsxs)("div",{className:"space-y-2",children:[(0,b.jsxs)(g.Label,{htmlFor:"firstName",children:["First Name ",(0,b.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,b.jsx)(h.Input,{id:"firstName",value:I.firstName,onChange:a=>J({...I,firstName:a.target.value}),className:(0,u.cn)(S.firstName&&"border-red-500")}),S.firstName&&(0,b.jsx)("p",{className:"text-xs text-red-500",children:S.firstName})]}),(0,b.jsxs)("div",{className:"space-y-2",children:[(0,b.jsx)(g.Label,{htmlFor:"lastName",children:"Last Name"}),(0,b.jsx)(h.Input,{id:"lastName",value:I.lastName,onChange:a=>J({...I,lastName:a.target.value}),className:(0,u.cn)(S.lastName&&"border-red-500")}),S.lastName&&(0,b.jsx)("p",{className:"text-xs text-red-500",children:S.lastName})]}),(0,b.jsxs)("div",{className:"space-y-2",children:[(0,b.jsxs)(g.Label,{htmlFor:"dob",children:["Date of Birth ",(0,b.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,b.jsx)(h.Input,{id:"dob",type:"date",max:new Date().toISOString().split("T")[0],value:I.dob,onChange:a=>J({...I,dob:a.target.value}),className:(0,u.cn)(S.dob&&"border-red-500")}),S.dob&&(0,b.jsx)("p",{className:"text-xs text-red-500",children:S.dob}),I.dob&&!S.dob&&(0,b.jsxs)("p",{className:"text-xs text-muted-foreground",children:["Age: ",V(I.dob)," years",V(I.dob)>12?" (Adult)":V(I.dob)>=2?" (Child)":" (Infant)"]})]}),(0,b.jsxs)("div",{className:"space-y-2",children:[(0,b.jsxs)(g.Label,{htmlFor:"gender",children:["Gender ",(0,b.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,b.jsxs)("select",{id:"gender",className:(0,u.cn)("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",S.gender&&"border-red-500"),value:I.gender,onChange:a=>J({...I,gender:a.target.value}),children:[(0,b.jsx)("option",{value:"",children:"Select Gender"}),(0,b.jsx)("option",{value:"male",children:"Male"}),(0,b.jsx)("option",{value:"female",children:"Female"}),(0,b.jsx)("option",{value:"other",children:"Other"})]}),S.gender&&(0,b.jsx)("p",{className:"text-xs text-red-500",children:S.gender})]}),(0,b.jsxs)("div",{className:"space-y-2",children:[(0,b.jsxs)(g.Label,{htmlFor:"mobile",children:["Mobile Number ",(0,b.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,b.jsx)(h.Input,{id:"mobile",value:I.mobile,onChange:a=>J({...I,mobile:a.target.value}),className:(0,u.cn)(S.mobile&&"border-red-500")}),S.mobile&&(0,b.jsx)("p",{className:"text-xs text-red-500",children:S.mobile})]}),(0,b.jsxs)("div",{className:"space-y-2",children:[(0,b.jsxs)(g.Label,{htmlFor:"email",children:["Email ",(0,b.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,b.jsx)(h.Input,{id:"email",type:"email",value:I.email,onChange:a=>J({...I,email:a.target.value}),className:(0,u.cn)(S.email&&"border-red-500")}),S.email&&(0,b.jsx)("p",{className:"text-xs text-red-500",children:S.email})]}),w&&(0,b.jsxs)("div",{className:"md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4",children:[(0,b.jsxs)("div",{className:"space-y-2",children:[(0,b.jsxs)(g.Label,{htmlFor:"passport",children:["Passport Number ",(0,b.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,b.jsx)(h.Input,{id:"passport",value:I.passport,onChange:a=>J({...I,passport:a.target.value.toUpperCase()}),placeholder:"A1234567",maxLength:8,className:(0,u.cn)(S.passport&&"border-red-500")}),S.passport&&(0,b.jsx)("p",{className:"text-xs text-red-500",children:S.passport}),(0,b.jsx)("p",{className:"text-xs text-muted-foreground",children:"Format: 1 letter followed by 7 digits (e.g., A1234567)"})]}),(0,b.jsxs)("div",{className:"space-y-2",children:[(0,b.jsxs)(g.Label,{htmlFor:"passportExpiry",children:["Passport Expiry Date ",(0,b.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,b.jsx)(h.Input,{id:"passportExpiry",type:"date",value:I.passportExpiry,onChange:a=>J({...I,passportExpiry:a.target.value}),className:(0,u.cn)(S.passportExpiry&&"border-red-500")}),S.passportExpiry&&(0,b.jsx)("p",{className:"text-xs text-red-500",children:S.passportExpiry})]})]})]}),"Passenger Details"===l&&(0,b.jsx)("div",{className:"flex justify-end pt-4",children:(0,b.jsxs)(e.Button,{onClick:X,size:"lg",className:"min-w-[200px] font-semibold",children:["Continue to Ancillaries ",(0,b.jsx)(ab.ChevronRight,{className:"w-4 h-4 ml-2"})]})})]}),U()>=4&&(0,b.jsxs)("div",{className:(0,u.cn)("border-2 rounded-xl p-6 space-y-6 bg-card shadow-lg transition-all",U()>4?"opacity-50 pointer-events-none":""),children:[(0,b.jsxs)("div",{className:"flex items-center gap-2 mb-2",children:[U()>4&&(0,b.jsx)(aa.Lock,{className:"w-5 h-5 text-muted-foreground"}),(0,b.jsx)("h3",{className:"text-2xl font-bold",children:"Ancillaries"}),(0,b.jsx)("p",{className:"text-sm text-muted-foreground ml-2",children:"(Optional)"})]}),(0,b.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[(0,b.jsxs)("div",{className:(0,u.cn)("border-2 p-5 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md",K.extraBaggage?"border-primary bg-primary/10 ring-2 ring-primary/20 shadow-sm":"hover:border-primary/50 hover:bg-muted/50"),onClick:()=>L({...K,extraBaggage:!K.extraBaggage}),children:[(0,b.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,b.jsx)("p",{className:"font-medium",children:"Extra Baggage"}),K.extraBaggage&&(0,b.jsx)("div",{className:"h-5 w-5 rounded-full bg-primary flex items-center justify-center",children:(0,b.jsx)(_.CheckCircle2,{className:"h-4 w-4 text-primary-foreground"})})]}),(0,b.jsx)("p",{className:"text-sm text-muted-foreground mb-2",children:"Additional 15kg baggage allowance"}),(0,b.jsxs)("div",{className:"flex items-center justify-between",children:[(0,b.jsx)("span",{className:"text-sm font-semibold text-primary",children:"+ ₹1,500"}),(0,b.jsx)(e.Button,{variant:K.extraBaggage?"default":"outline",size:"sm",className:"mt-2",onClick:a=>{a.stopPropagation(),L({...K,extraBaggage:!K.extraBaggage})},children:K.extraBaggage?"Remove":"Add"})]})]}),(0,b.jsxs)("div",{className:(0,u.cn)("border-2 p-5 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md",K.mealSelection?"border-primary bg-primary/10 ring-2 ring-primary/20 shadow-sm":"hover:border-primary/50 hover:bg-muted/50"),onClick:()=>L({...K,mealSelection:!K.mealSelection}),children:[(0,b.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,b.jsx)("p",{className:"font-medium",children:"Meal Selection"}),K.mealSelection&&(0,b.jsx)("div",{className:"h-5 w-5 rounded-full bg-primary flex items-center justify-center",children:(0,b.jsx)(_.CheckCircle2,{className:"h-4 w-4 text-primary-foreground"})})]}),(0,b.jsx)("p",{className:"text-sm text-muted-foreground mb-2",children:"Pre-book your meal preference"}),(0,b.jsxs)("div",{className:"flex items-center justify-between",children:[(0,b.jsx)("span",{className:"text-sm font-semibold text-primary",children:"+ ₹1,200"}),(0,b.jsx)(e.Button,{variant:K.mealSelection?"default":"outline",size:"sm",className:"mt-2",onClick:a=>{a.stopPropagation(),L({...K,mealSelection:!K.mealSelection})},children:K.mealSelection?"Remove":"Select"})]})]}),(0,b.jsxs)("div",{className:(0,u.cn)("border-2 p-5 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md",K.seatSelection?"border-primary bg-primary/10 ring-2 ring-primary/20 shadow-sm":"hover:border-primary/50 hover:bg-muted/50"),onClick:()=>L({...K,seatSelection:!K.seatSelection}),children:[(0,b.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,b.jsx)("p",{className:"font-medium",children:"Seat Selection"}),K.seatSelection&&(0,b.jsx)("div",{className:"h-5 w-5 rounded-full bg-primary flex items-center justify-center",children:(0,b.jsx)(_.CheckCircle2,{className:"h-4 w-4 text-primary-foreground"})})]}),(0,b.jsx)("p",{className:"text-sm text-muted-foreground mb-2",children:"Choose your preferred seat"}),(0,b.jsxs)("div",{className:"flex items-center justify-between",children:[(0,b.jsx)("span",{className:"text-sm font-semibold text-primary",children:"+ ₹800"}),(0,b.jsx)(e.Button,{variant:K.seatSelection?"default":"outline",size:"sm",className:"mt-2",onClick:a=>{a.stopPropagation(),L({...K,seatSelection:!K.seatSelection})},children:K.seatSelection?"Remove":"Choose"})]})]})]}),"Ancillaries"===l&&(0,b.jsxs)("div",{className:"mt-4 p-4 bg-muted/30 rounded-lg",children:[(0,b.jsxs)("div",{className:"flex items-center justify-between",children:[(0,b.jsx)("span",{className:"text-sm font-medium",children:"Selected Ancillaries:"}),(0,b.jsxs)("span",{className:"text-sm font-semibold",children:["₹",(K.extraBaggage?K.extraBaggagePrice:0)+(K.mealSelection?K.mealPrice:0)+(K.seatSelection?K.seatPrice:0)]})]}),(0,b.jsx)("div",{className:"mt-2 text-xs text-muted-foreground",children:K.extraBaggage||K.mealSelection||K.seatSelection?[K.extraBaggage&&"Extra Baggage",K.mealSelection&&"Meal Selection",K.seatSelection&&"Seat Selection"].filter(Boolean).join(", "):"No ancillaries selected (optional)"})]}),"Ancillaries"===l&&(0,b.jsx)("div",{className:"flex justify-end pt-4",children:(0,b.jsxs)(e.Button,{onClick:X,size:"lg",className:"min-w-[200px] font-semibold",children:["Continue to Payment ",(0,b.jsx)(ab.ChevronRight,{className:"w-4 h-4 ml-2"})]})})]}),"Payment Pending"===l&&(0,b.jsxs)("div",{className:"border-2 rounded-xl p-6 space-y-6 bg-card shadow-lg",children:[(0,b.jsxs)("div",{className:"flex items-center justify-between",children:[(0,b.jsx)("h3",{className:"text-2xl font-bold",children:"Payment Pending"}),null!==O&&(0,b.jsxs)(W.Badge,{variant:O<3?"destructive":"secondary",children:["Time remaining: ",O," min"]})]}),(0,b.jsxs)("div",{className:"bg-gradient-to-r from-yellow-50 to-yellow-100/50 dark:from-yellow-950/20 dark:to-yellow-950/10 p-5 rounded-xl border-2 border-yellow-300 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200 shadow-sm",children:[(0,b.jsxs)("p",{className:"font-bold text-lg",children:["Total Amount: ₹",n?(n.price+3750+(K.extraBaggage?K.extraBaggagePrice:0)+(K.mealSelection?K.mealPrice:0)+(K.seatSelection?K.seatPrice:0)).toLocaleString("en-IN"):0]}),(0,b.jsx)("p",{className:"text-sm mt-2",children:"Please proceed to payment gateway to confirm your booking."}),null!==O&&O<5&&(0,b.jsxs)("p",{className:"text-sm font-semibold mt-3 flex items-center gap-1",children:[(0,b.jsx)(ac.AlertCircle,{className:"h-4 w-4"}),"Payment session expires in ",O," minute",1!==O?"s":""]})]}),(0,b.jsxs)("div",{className:"bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-950/10 p-5 rounded-xl border-2 border-blue-200 dark:border-blue-800 shadow-sm",children:[(0,b.jsxs)("div",{className:"flex items-center justify-between",children:[(0,b.jsx)("span",{className:"text-sm font-semibold text-blue-800 dark:text-blue-200",children:"Wallet Balance:"}),(0,b.jsxs)("span",{className:"text-xl font-bold text-blue-900 dark:text-blue-100",children:["₹",parseFloat(localStorage.getItem("wallet_balance")||"0").toLocaleString("en-IN")]})]}),n&&(0,b.jsxs)("p",{className:"text-xs text-blue-700 dark:text-blue-300 mt-1",children:["Required: ₹",(n.price+3750+(K.extraBaggage?K.extraBaggagePrice:0)+(K.mealSelection?K.mealPrice:0)+(K.seatSelection?K.seatPrice:0)).toLocaleString("en-IN"),parseFloat(localStorage.getItem("wallet_balance")||"0")<n.price+3750+(K.extraBaggage?K.extraBaggagePrice:0)+(K.mealSelection?K.mealPrice:0)+(K.seatSelection?K.seatPrice:0)&&(0,b.jsx)("span",{className:"text-red-600 dark:text-red-400 font-semibold ml-2",children:"(Insufficient balance)"})]})]}),(0,b.jsxs)("div",{className:"space-y-4",children:[(0,b.jsxs)("div",{className:"space-y-2",children:[(0,b.jsx)(g.Label,{children:"Payment Method"}),(0,b.jsxs)("select",{className:"flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm",value:M.paymentMethod,onChange:a=>N({...M,paymentMethod:a.target.value,walletUsage:"wallet"===a.target.value}),children:[(0,b.jsx)("option",{value:"",children:"Select payment method"}),(0,b.jsx)("option",{value:"wallet",children:"Wallet"}),(0,b.jsx)("option",{value:"card",children:"Credit/Debit Card"}),(0,b.jsx)("option",{value:"netbanking",children:"Net Banking"})]})]}),(0,b.jsxs)("div",{className:"flex items-center gap-2",children:[(0,b.jsx)("input",{type:"checkbox",id:"acceptTerms",checked:M.acceptTerms,onChange:a=>N({...M,acceptTerms:a.target.checked})}),(0,b.jsxs)(g.Label,{htmlFor:"acceptTerms",className:"cursor-pointer",children:["I accept the terms and conditions ",(0,b.jsx)("span",{className:"text-red-500",children:"*"})]})]})]}),(0,b.jsx)("div",{className:"flex justify-end pt-2",children:(0,b.jsx)(e.Button,{onClick:X,size:"lg",className:"min-w-[200px] bg-green-600 hover:bg-green-700 font-semibold shadow-lg hover:shadow-xl transition-all",children:"Pay & Confirm"})})]}),"Booking Confirmed"===l&&(0,b.jsxs)("div",{className:"border-2 rounded-xl p-8 text-center bg-gradient-to-br from-green-50 to-green-100/50 border-green-300 shadow-xl",children:[(0,b.jsx)("div",{className:"flex justify-center mb-6",children:(0,b.jsx)("div",{className:"h-20 w-20 bg-green-100 rounded-full flex items-center justify-center shadow-lg",children:(0,b.jsx)(_.CheckCircle2,{className:"h-10 w-10 text-green-600"})})}),(0,b.jsx)("h2",{className:"text-3xl font-bold text-green-800 mb-3",children:"Booking Confirmed!"}),(0,b.jsx)("p",{className:"text-lg text-green-700 mb-8 font-medium",children:"Your flight has been successfully booked and ticketed."}),p&&r&&(0,b.jsxs)("div",{className:"bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 space-y-3 max-w-md mx-auto border-2 border-green-200 shadow-lg",children:[(0,b.jsxs)("div",{className:"flex items-center justify-between",children:[(0,b.jsx)("span",{className:"font-bold text-base",children:"Booking ID:"}),(0,b.jsx)("span",{className:"font-mono text-xl font-bold text-primary",children:p})]}),(0,b.jsxs)("div",{className:"flex items-center justify-between",children:[(0,b.jsx)("span",{className:"font-bold text-base",children:"PNR:"}),(0,b.jsx)("span",{className:"font-mono text-xl font-bold text-primary",children:r})]})]}),(0,b.jsxs)("div",{className:"flex justify-center gap-4",children:[(0,b.jsx)(e.Button,{variant:"outline",onClick:()=>{if(n&&p&&r){var a,b;let c,d,e,f,g,h,i,j,k=(K.extraBaggage?K.extraBaggagePrice:0)+(K.mealSelection?K.mealPrice:0)+(K.seatSelection?K.seatPrice:0);b=a={bookingId:p,pnr:r,flight:{airline:n.airline,flightNumber:n.flightNumber,departure:n.departure,arrival:n.arrival,duration:n.duration},passenger:{firstName:I.firstName,lastName:I.lastName||void 0,dob:I.dob,gender:I.gender,mobile:I.mobile,email:I.email,passport:I.passport||void 0},passengerCount:G,bookingDate:new Date().toISOString(),totalAmount:n.price+3750+k,ancillaries:{extraBaggage:K.extraBaggage,mealSelection:K.mealSelection,seatSelection:K.seatSelection}},c=a=>new Date(a).toLocaleDateString("en-IN",{weekday:"short",year:"numeric",month:"short",day:"numeric"}),d=a=>new Date(a).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit",hour12:!0}),e=1500*!!b.ancillaries?.extraBaggage+1200*!!b.ancillaries?.mealSelection+800*!!b.ancillaries?.seatSelection,g=new Blob([f=`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Flight Ticket - ${b.bookingId}</title>
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
          <strong>Booking ID:</strong> ${b.bookingId}
        </div>
        <div>
          <strong>PNR:</strong> ${b.pnr}
        </div>
      </div>
    </div>
    
    <div class="ticket-body">
      <div class="flight-section">
        <div class="flight-header">
          <div>
            <div class="airline-name">${b.flight.airline}</div>
            <div class="flight-number">Flight ${b.flight.flightNumber}</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 12px; color: #6b7280;">Booking Date</div>
            <div style="font-size: 16px; font-weight: 600; color: #1f2937;">
              ${c(b.bookingDate)}
            </div>
          </div>
        </div>
        
        <div class="route-info">
          <div class="airport">
            <div class="airport-code">${b.flight.departure.code}</div>
            <div class="airport-city">${b.flight.departure.city}</div>
            <div class="airport-time">${d(b.flight.departure.time)}</div>
            <div class="airport-date">${c(b.flight.departure.time)}</div>
          </div>
          
          <div class="route-line">
            <div class="route-duration">${b.flight.duration}</div>
            <div class="route-arrow"></div>
          </div>
          
          <div class="airport">
            <div class="airport-code">${b.flight.arrival.code}</div>
            <div class="airport-city">${b.flight.arrival.city}</div>
            <div class="airport-time">${d(b.flight.arrival.time)}</div>
            <div class="airport-date">${c(b.flight.arrival.time)}</div>
          </div>
        </div>
      </div>
      
      <div class="passenger-section">
        <div class="section-title">Passenger Information</div>
        <div class="passenger-details">
          <div class="detail-item">
            <div class="detail-label">Passenger Name</div>
            <div class="detail-value">${b.passenger.firstName}${b.passenger.lastName?` ${b.passenger.lastName}`:""}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Date of Birth</div>
            <div class="detail-value">${c(b.passenger.dob)}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Gender</div>
            <div class="detail-value">${b.passenger.gender.charAt(0).toUpperCase()+b.passenger.gender.slice(1)}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Mobile</div>
            <div class="detail-value">${b.passenger.mobile}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Email</div>
            <div class="detail-value">${b.passenger.email}</div>
          </div>
          ${b.passenger.passport?`
          <div class="detail-item">
            <div class="detail-label">Passport</div>
            <div class="detail-value">${b.passenger.passport}</div>
          </div>
          `:""}
          <div class="detail-item">
            <div class="detail-label">Travelers</div>
            <div class="detail-value">
              ${b.passengerCount.adults} Adult${1!==b.passengerCount.adults?"s":""}
              ${b.passengerCount.children>0?`, ${b.passengerCount.children} Child${1!==b.passengerCount.children?"ren":""}`:""}
              ${b.passengerCount.infants>0?`, ${b.passengerCount.infants} Infant${1!==b.passengerCount.infants?"s":""}`:""}
            </div>
          </div>
        </div>
        
        ${b.ancillaries&&(b.ancillaries.extraBaggage||b.ancillaries.mealSelection||b.ancillaries.seatSelection)?`
        <div class="ancillaries-section">
          <div class="section-title">Selected Ancillaries</div>
          <div class="ancillaries-list">
            ${b.ancillaries.extraBaggage?'<span class="ancillary-badge">Extra Baggage</span>':""}
            ${b.ancillaries.mealSelection?'<span class="ancillary-badge">Meal Selection</span>':""}
            ${b.ancillaries.seatSelection?'<span class="ancillary-badge">Seat Selection</span>':""}
          </div>
        </div>
        `:""}
      </div>
      
      <div class="price-breakdown">
        <div class="section-title">Price Breakdown</div>
        <div class="price-row">
          <span class="price-label">Base Fare</span>
          <span class="price-value">₹${(b.totalAmount-3750-e).toLocaleString("en-IN")}</span>
        </div>
        <div class="price-row">
          <span class="price-label">Taxes & Fees</span>
          <span class="price-value">₹3,750</span>
        </div>
        ${e>0?`
        <div class="price-row">
          <span class="price-label">Ancillaries</span>
          <span class="price-value">₹${e.toLocaleString("en-IN")}</span>
        </div>
        `:""}
        <div class="price-row total">
          <span class="price-label">Total Amount</span>
          <span class="price-value">₹${b.totalAmount.toLocaleString("en-IN")}</span>
        </div>
      </div>
    </div>
    
    <div class="ticket-footer">
      <div class="barcode">
        <div class="barcode-text">${b.pnr}</div>
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
  `],{type:"text/html"}),h=URL.createObjectURL(g),(i=document.createElement("a")).href=h,i.download=`Flight-Ticket-${a.bookingId}.html`,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(h),(j=window.open("","_blank"))&&(j.document.write(f),j.document.close(),setTimeout(()=>{j.print()},250)),ag.toast.success("Ticket downloaded",{description:"Your flight ticket has been downloaded and opened for printing."})}else ag.toast.error("Ticket data not available",{description:"Please complete the booking to download the ticket."})},children:"Download Ticket"}),(0,b.jsx)(e.Button,{onClick:()=>window.location.href="/dashboard",children:"Return to Dashboard"})]})]})]})}a.s(["default",()=>an],76296)}];

//# sourceMappingURL=Downloads_travel-booking-platform_app_dashboard_flights_page_tsx_7ec1203d._.js.map