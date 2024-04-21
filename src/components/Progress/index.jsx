import dayjs from "dayjs";

const Progress = ({ data }) => {
  console.log("DATA", data);
  return (
    <div className="w-100">
      <div className="row">
        <b className="small col-4">
          {dayjs(data.beginDate).format("DD/MM/YYYY")}
        </b>
        <b className="small col-4 text-center">{data.percentProgressStr}</b>
        <b className="small col-4 text-end">
          {dayjs(data.endDate).format("DD/MM/YYYY")}
        </b>
      </div>
      <div class="container">
        <div class="progress">
          {data.percentProgress < 33 && (
            <div
              class={"progress-bar progress-bar-striped bg-success"}
              role="progressbar"
              style={{ width: `${data.percentProgress}%` }}
            ></div>
          )}
          {data.percentProgress > 33 && data.percentProgress < 66 && (
            <div
              class={"progress-bar progress-bar-striped bg-warning"}
              role="progressbar"
              style={{ width: `${data.percentProgress}%` }}
            ></div>
          )}
          {data.percentProgress > 66 && (
            <div
              class={"progress-bar progress-bar-striped bg-danger"}
              role="progressbar"
              style={{ width: `${data.percentProgress}%` }}
            ></div>
          )}
        </div>
      </div>
      <div className="row">
        <b className="small col-4">0 ₫</b>
        <b className="small col-4 text-center">
          {(data.remainAmount > 0) ? (
            <>{data.currentAmountStr}</>
          ) : (
            <>{data.remainAmountStr}</>
          )}
        </b>
        <b className="small col-4 text-end">{data.targetAmountStr}</b>
      </div>
    </div>
  );
};

export default Progress;
