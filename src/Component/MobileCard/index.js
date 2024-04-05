import React from "react";
import {
  categoryIconWithColors,
  getAppBaseUrl,
} from "../../helper/commonHelper";

import { NewButton } from "../../CommonComponent/NewCustomButton";

export default function MobileCard({ cardData }) {
  const CategoryStyles = categoryIconWithColors(cardData?.header?.category);

  return (
    <React.Fragment>
      <div className="flex justify-space-between col-gap-10">
        <div className="flex col-gap-10">
          <div
            className="list-icon-container"
            style={{ background: CategoryStyles?.lightColor }}
          >
            <span>
              <img
                src={CategoryStyles?.icon}
                alt={cardData?.header?.category}
              />
            </span>
          </div>
          <div>
            <div>
              <span className="margin-r5 font-600 text-101828">
                {cardData?.header?.heading}
              </span>
              <span className="margin-r5 font-500 text-667085">
                {cardData?.header?.subheading}
              </span>
            </div>
            {cardData?.header?.name ? (
              <div className="font-[500] text-16">{cardData?.header?.name}</div>
            ) : null}
            <div>
              <span className="margin-r5">{cardData?.header?.id}</span>

              <span className="list-label warning-label">
                {cardData?.header?.status}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="list-description text-14">{cardData?.header?.desc}</div>
      <div className="list-grid">
        {cardData?.body?.map((item, i) => {
          return (
            <div key={i} className="">
              <div className="grid-list-heading">{item?.label}</div>
              <div className="grid-list-text">{item?.value}</div>
            </div>
          );
        })}
      </div>
      {cardData?.footer?.actionBtn ? (
        <div>
          <NewButton
            fullWidth
            href={getAppBaseUrl() + `${cardData?.footer?.actionBtn?.path}`}
            target="_blank"
            className="capitalize"
            variant="contained"
            size="medium"
            color="primary"
            sx={{ color: "#fff !important", fontWeight: "500" }}
          >
            {cardData?.footer?.actionBtn?.label}
          </NewButton>
        </div>
      ) : null}
    </React.Fragment>
  );
}
