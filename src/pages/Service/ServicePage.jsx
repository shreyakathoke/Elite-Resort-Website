import AmazingServices from "./AmazingServices";
import ServiceCards from "./ServiceCards";
import ServiceGrid from "./ServiceGrid"; 
import ServiceHero from "./ServiceHero" ;
import WellnessCards from "./WellnessCards";

export default function ServicePage() {
  return (
    <>
      <ServiceHero/>
      <AmazingServices />
      <ServiceCards />
      <WellnessCards/>
      <ServiceGrid/>
     
      

    </>
  );
}
