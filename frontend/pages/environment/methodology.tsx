
import { Template } from "../../components/generic/Template";
import { NextPage } from "next";

const Methodology: NextPage = () => {
  return (
    <Template title="Methodology">
      <h1>How do we estimate these stats?</h1>
      <p>
        Our carbon emission estimates are based on the combined saving of brick and mortar delivery services,
        manufacturing and accumilating landfill waste if you were to trade away your unwanted items for other items you want.
        There are some small assumptions we have to make in our calculations. This is reviewed by a panel of experts in the field of climate change and sustainability.
        These include:
        <ul>
          <li>Brick and Mortar deliveries are performed by light commercial vehicles which run on E10 ethanol</li>
          <li>Light commercial vehicles use 12.8L of fuel per 100km, and travel 52,307,000km in a year on average </li>
          <li>Light commercial vehicles total litres of ethanol burnt yearly equates to 6,681,360L</li>
          <li>Light commercial vehicles emit 1.5kg of CO2 per litre of ethanol burnt, equating to 78,460,800kg of CO2 per year</li>
          <li>Assume 520,000,000 deliveries occuring in Australia per year</li>
          <li>Methane CO2 emission factor is 21kg/kg</li>
          <li>Nitrogen oxide CO2 emission factor is 25kg/kg</li>
        </ul>
      </p>
      <h3>Landfill Waste</h3>
      <p>
        We estimate the amount of landfill waste per cubic meter that you save by the volume of the items you trade away. Every cubic meter counts!
      </p>
      <h3>CO2 Emission</h3>
      <p>
        Three factors combine to create the CO2 emission that you save by trading away your unwanted items. These are:
        <ul>
          <li>Landfill waste
            <p>
              Accumulating landfill emits CO2 proportional to the mass of the waste. The proportionality is calculated using the methane and nitrogen oxide emission factors listed above.
            </p>
          </li>
          <li>Manufacturing</li>
            <p>
              Manufacturing new items emits CO2 proportional to the mass of the item, and 35% of excess material which is not used to create the product. The amount of CO2 emitted is determined by the materials used in the manufacturing process.
            </p>
          <li>Brick and Mortar Delivery</li>
          <p>
            When ever you order an item online, it is often delivered to you by a light commercial vehicle. There are approximately 500,000 deliveries in Australia per year. The amount of CO2 emitted from these deliveries is calculated using the emission factors listed above.
          </p>
        </ul>
      </p>
      <h1>References</h1>
      <ul>
        <li>https://www.budgetdirect.com.au/car-insurance/research/average-fuel-consumption-australia.html</li>
        <li>https://www.budgetdirect.com.au/car-insurance/research/average-kilometers-driven.html</li>
        <li>https://www.commonobjective.co/article/fashion-and-waste-an-uneasy-relationship#:~:text=On%20average%2C%2035%25%20of%20all,or%20product%20reaches%20the%20consumer.</li>
        <li>https://www.patagoniaalliance.org/wp-content/uploads/2014/08/How-much-carbon-dioxide-is-produced-by-burning-gasoline-and-diesel-fuel-FAQ-U.S.-Energy-Information-Administration-EIA.pdf</li>
        <li>https://www.winnipeg.ca/finance/findata/matmgt/documents/2012/682-2012/682-2012_Appendix_H-WSTP_South_End_Plant_Process_Selection_Report/Appendix%207.pdf</li>
      </ul>
    </Template>
  );
};

export default Methodology
