const Progress = ({ fromDate, toDate, fromValue, toValue, percent, value }) => {
  return (
      <div className="w-100">
          <div className="row">
              <span className="small col-4">{fromDate}</span>
              <b className="small col-4 text-center">{percent}%</b>
              <span className="small col-4 text-end">{toDate}</span>
          </div>
          <div class="progress">
              <div
                  class="progress-bar bg-success"
                  role="progressbar"
                  aria-valuenow={percent}
                  style={{ width: percent + "%" }}
                  aria-valuemin="0"
                  aria-valuemax="100"
              ></div>
          </div>
          <div className="row">
              <span className="small col-4">{fromValue}</span>
              <b className="small col-4 text-center">{value}</b>
              <span className="small col-4 text-end">{toValue}</span>
          </div>
      </div>
  );
};

export default Progress