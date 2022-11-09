
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
          <li>Assume 500,000 deliveries occuring in Australia per year</li>
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
    </Template>
  );
};

export default Methodology
