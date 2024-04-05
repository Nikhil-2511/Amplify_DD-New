import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MandateIcon from "../../../assets/images/mandateIcon.svg";
import CreateMandate from "../../CreateMandate";
import { CreateMandateModel } from "../../CreateMandate/MandateModel";
import { updateSnackbar } from "../../../Redux/slice/CommonSlice";
import { trackEvent } from "../../../helper/posthogHelper";
import { BUYER_CLICKED_CREATE_MANDATE } from "../../../constants/posthogEvents";

function CreateMandateCTA({source}) {
  const dispatch = useDispatch();
  const [showCreateMandate, setShowCreateMandate] = useState(false);

  function handleClose() {
    setShowCreateMandate(false);
  }

  function handleSubmit() {
    setShowCreateMandate(false);
    dispatch(
      updateSnackbar({
        message:
          "Thank you for your mandate! Companies that fit your mandate will soon appear in 'Recommendation' tab.",
        isOpen: true,
      })
    );
  }

  function handleCreateMandate(){
    setShowCreateMandate(true);
    trackEvent(BUYER_CLICKED_CREATE_MANDATE,{
      source : source
    });
  }

  return (
    <div className="browser-screen-container relative">
      <div>
        <div
          className="floating-icon cursor-pointer sm:right-[45px] sm:bottom-[62px]"
          onClick={() => handleCreateMandate()}
        >
          <img src={MandateIcon} alt="" />
          Create Mandate
        </div>

        {showCreateMandate && (
          <CreateMandate
            model={CreateMandateModel}
            onClose={handleClose}
            onSuccess={handleSubmit}
            confirmLabel={"Create a Mandate"}
            source={source}
          />
        )}
      </div>
    </div>
  );
}

export default CreateMandateCTA;
