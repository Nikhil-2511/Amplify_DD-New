import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import EastIcon from '@mui/icons-material/East';
import './style.scss';
import { useLocation } from "react-router-dom";
import { setSessionStorage } from "../../utils/localStorage";
import { useQuery } from "../../helper/customHook";

function QuestionnaireFillerScreen() {
  const location = useLocation();
  const query = useQuery();

  useEffect(() => {
    let source = query.get("utm_source");
    if(source) setSessionStorage('utm_source', source);
  }, [])

  return (
    <div className="filler-scren-container grad-1">
      <Stack sx={{ maxWidth: "1229px", margin: '0 auto', p: 3 }}>
        <h1 className="text-black font-bold text-36 text-center">Hey Founder 👋</h1>
        <p className="text-30 font-600 text-center margin-0 lh-40">
          You’re just a few steps away from getting acquired.
        </p>
        <p className="text-30 font-600 text-center margin-0 lh-40">Use our valuation calculator to know what</p>
        <p className="text-30 font-700 text-center margin-0">your business is worth in the market.</p>
        <div className="filler-cta-container">
          <Button className="filler-cta button radial-grad capitalize" href={"/valq" + (location.search ? location.search : '')} endIcon={<EastIcon sx={{ fontSize: '20px', marginTop: '2px' }} />}>Value your business</Button>
        </div>
      </Stack>

    </div>
  )
}

export default QuestionnaireFillerScreen;