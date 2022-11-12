
import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { Box, List, ListItem, Typography } from "@mui/material";

const Methodology: NextPage = () => {
  return (
    <Template title="Methodology">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ fontSize: 23, mt: 4, textAlign: 'center', fontWeight: 'bold' }}>
          How do we estimate these stats?
        </Typography>
        <Typography sx={{ fontSize: 16, mt: 4, textAlign: 'center', width: '45vw', mb: 4 }}>
          Our carbon emission estimates are based on the combined saving of delivery,
          manufacturing and avoided landfill waste by trading.
          There are some small assumptions we have to make in our calculations. This is reviewed by a panel of experts in the field of climate change and sustainability.
          These include:
        </Typography>
        <List sx={{ listStyleType: 'disc', pl: 2, '& .MuiListItem-root': { display: 'list-item' } }}>
          <ListItem>Deliveries are performed by light commercial vehicles which run on E10 ethanol</ListItem>
          <ListItem>Light commercial vehicles use 12.8L of fuel per 100km, and travel 52,307,000km in a year on average </ListItem>
          <ListItem>Light commercial vehicles total litres of ethanol burnt yearly equates to 6,681,360L</ListItem>
          <ListItem>Light commercial vehicles emit 1.5kg of CO2 per litre of ethanol burnt, equating to 78,460,800kg of CO2 per year</ListItem>
          <ListItem>Assume 520,000,000 deliveries occuring in Australia per year</ListItem>
          <ListItem>Methane CO2 emission factor is 21kg/kg</ListItem>
          <ListItem>Nitrogen oxide CO2 emission factor is 25kg/kg</ListItem>
        </List>
        <Typography sx={{ fontSize: 17, mt: 4, textAlign: 'center', fontWeight: 'bold' }}>
          Landfill Waste
        </Typography>
        <Typography sx={{ fontSize: 16, mt: 3, textAlign: 'center', width: '50vw', mb: 4 }}>
          We estimate the amount of landfill waste per cubic meter that you save by the volume of the items you trade away. Every cubic meter counts!
        </Typography>
        <Typography sx={{ fontSize: 17, mt: 4, textAlign: 'center', fontWeight: 'bold' }}>
          CO2 Emission
        </Typography>
        <Typography sx={{ fontSize: 16, mt: 3, textAlign: 'center', width: '50vw', mb: 4 }}>
          Three factors combine to create the CO2 emission that you save by trading away your unwanted items. These are:
        </Typography>
        <List sx={{ listStyleType: 'disc', pl: 2, '& .MuiListItem-root': { display: 'list-item' }, width: '40vw' }}>
          <ListItem>Landfill Waste - Accumulating landfill emits CO2 proportional to the mass of the waste. The proportionality is calculated using the methane and nitrogen oxide emission factors listed above.</ListItem>
          <ListItem>Manufacturing - Manufacturing new items emits CO2 proportional to the mass of the item, and 35% of excess material which is not used to create the product. The amount of CO2 emitted is determined by the materials used in the manufacturing process.</ListItem>
          <ListItem>Delivery - When ever you order an item online, it is often delivered to you by a light commercial vehicle. There are approximately 500,000 deliveries in Australia per year. The amount of CO2 emitted from these deliveries is calculated using the emission factors listed above.</ListItem>
        </List>
        <Typography sx={{ fontSize: 17, mt: 4, textAlign: 'center', fontWeight: 'bold' }}>
          References
        </Typography>
        <List sx={{ listStyleType: 'disc', pl: 2, '& .MuiListItem-root': { display: 'list-item' }, width: '40vw', mb: 5 }}>
          <ListItem>https://www.budgetdirect.com.au/car-insurance/research/average-fuel-consumption-australia.html</ListItem>
          <ListItem>https://www.budgetdirect.com.au/car-insurance/research/average-kilometers-driven.html</ListItem>
          <ListItem>https://www.commonobjective.co/article/fashion-and-waste-an-uneasy-relationship#:~:text=On%20average%2C%2035%25%20of%20all,or%20product%20reaches%20the%20consumer.</ListItem>
          <ListItem>https://www.patagoniaalliance.org/wp-content/uploads/2014/08/How-much-carbon-dioxide-is-produced-by-burning-gasoline-and-diesel-fuel-FAQ-U.S.-Energy-Information-Administration-EIA.pdf</ListItem>
          <ListItem>https://www.winnipeg.ca/finance/findata/matmgt/documents/2012/682-2012/682-2012_Appendix_H-WSTP_South_End_Plant_Process_Selection_Report/Appendix%207.pdf</ListItem>
        </List>
      </Box>
    </Template>
  );
};

export default Methodology
