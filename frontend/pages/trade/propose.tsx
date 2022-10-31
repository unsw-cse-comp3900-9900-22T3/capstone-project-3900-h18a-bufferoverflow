import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { Box, Typography } from "@mui/material";
import { ItemCard, ItemCardProps } from "../../components/feed/ItemCard";
import { useEffect, useState } from "react";
import { Toast } from "../../components/generic/Toast";

const Propose: NextPage = () => {

  const [data, setData] = useState<ItemCardProps[]>([])
  const [successToast, setSuccessToast] = useState<string>('');
  
  return (
    <Template title="Propose">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Toast toast={successToast} setToast={setSuccessToast} type='success' />
        <Typography sx={{ width: '80vw', fontWeight: 'bold', mt: 3.5, mb: 1.5 }}>
          Propose a Trade
        </Typography>
        <Typography sx={{ width: '80vw', mb: 2.5 }}>
          Select an item from your have listings to propose
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '90vw', pl: 10, mb: 10 }}>
          {
            data?.map(item => {
              return (
                <ItemCard
                  {...item}
                  onClick={() => {
                    setSuccessToast('Trade Proposed Successfully')
                  }}
                />
              )
            })
          }
        </Box>
      </Box>
    </Template>
  );
};

export default Propose
