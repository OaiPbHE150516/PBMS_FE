const Progress = ({ fromDate, toDate, fromValue, toValue, percent, value }) => {
  return (
    <div className="w-100">
      <div className="row">
        <span className="small col-4">{fromDate}</span>
        <b className="small col-4 text-center">{percent}%</b>
        <span className="small col-4 text-end">{toDate}</span>
      </div>
      <div class="container">
        <div className="progress-bar progress-layer-1"></div>
        <div
          class="progress-bar progress-layer-2"
          style={{ width: `${Math.max(0, 100 - percent)}%` }}
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

export default Progress;
