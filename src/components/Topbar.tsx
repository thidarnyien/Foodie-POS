
import { getSelectedLocation } from "@/libs/actions"
import SignOutButton from "./SignOutButton";

export async function Topbar(){
  const selectedLocation = await getSelectedLocation();

  return(
    <div style={{display:"flex" ,justifyContent:"space-between",
                      alignItems:"center",
                      padding:"16px",
                      position:"sticky",
                      top:"0px",
                      color:"#fcefee",
                      userSelect:"none",
                      backgroundColor: "#ee5a5a"}}>
                    <h3>Foodie POS</h3>
                    <h3>{selectedLocation?.location.name}</h3>
                    <SignOutButton/>
      </div>
  )
}

// "use server"
// import {getSelectedLocation } from "@/libs/actions";
// import SignOutButton from "./SignOutButton";

// export async function Topbar() {
//   // const selectedLocation = await getSelectedLocation();

//   return (
//             <div style={{display:"flex" ,justifyContent:"space-between",
//                 alignItems:"center",
//                 padding:"16px",
//                 position:"sticky",
//                 top:"0px",
//                 color:"#fcefee",
//                 userSelect:"none",
//                 backgroundColor: "#ee5a5a"}}>
//               <h3 >Foodie POS</h3>
//               {/* <h3>{selectedLocation?.location.name}</h3>   */}
//               {/* <SignOutButton/> */}
//             </div>
//         )
// }


// "use server"
// import { getSelectedLocation } from "@/libs/actions";
// import SignOutButton from "./SignOutButton";


// export function Topbar(){
//   // const selectedLocation = await getSelectedLocation();
// // const [currentLocation, setCurrentLocation] = useState<Locations>();
// //   useEffect(()=> {
// //     handleGetLocations()
// //   },[]);
  
// //   const handleGetLocations= async () => {
// //     const locations = await getCompanyLocations();
// //     const currentLocationId = localStorage.getItem("currentLocationId");
// //     if(!currentLocationId){
// //         const firstLocaiton = locations[0];
// //         localStorage.setItem("currentLocationId", String(firstLocaiton.id));

// //     }else{
// //         const currentLocation = locations.find(location => location.id === Number(currentLocationId));
// //         setCurrentLocation(currentLocation);
// //     }

// //   }

//     return (
//         <div style={{display:"flex" ,justifyContent:"space-between",
//             alignItems:"center",
//             padding:"16px",
//             position:"sticky",
//             top:"0px",
//             color:"#fcefee",
//             userSelect:"none",
//             backgroundColor: "#ee5a5a"}}>
//           <h3 >Foodie POS</h3>
//           <h3>Sanchaung</h3>  
//           <SignOutButton/>
//         </div>
//     )
// }
// export default Topbar;