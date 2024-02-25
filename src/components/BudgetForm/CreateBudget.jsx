import clsx from 'clsx';
import React, {useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from '../Button';
import MultipleSelect from '../MultipleSelect';
import Popup from '../Popup';

/**
 *
 * @param {Date} date
 */
function getMonthAndDay(date) {
  const monthName = date.toLocaleString("default", { month: "short" });
  return `${monthName} ${date.getDate()}`;
}

/**
*
* @param {Date} date
*/
const getInputDateFormat = (date) => {
  const year = date.toLocaleString("default", { year: "numeric" });
  const month = date.toLocaleString("default", { month: "2-digit" });
  const day = date.toLocaleString("default", { day: "2-digit" });

  return `${year}-${month}-${day}`;
};

const CreateBudget = ({show, showSet}) => {
  const [budgetName, budgetNameSet] = useState('')
  const [category, categorySet] = useState([{label: 'Ăn uống ', value: 'au'}, {label: 'Giải trí', value: 'gt'}])
  const [initialAmount, initialAmountSet] = useState('')
  const [wallet, walletSet] = useState([{label: 'Tiền mặt', value: 'tm'}, {label: 'TP Bank', value: 'tpbank'}])
  const [repeat, repeatSet] = useState(true)
  const [numberIterations, numberIterationsSet] = useState(1)
  const [note, noteSet] = useState('')
  const [period, periodSet] = useState(
      /** @type {'week' | 'month' | 'other'} */ ("other")
  );

  const getPeriodTimeBy = (period) => {
      const now = new Date();
      switch (period) {
          case "week": {
              const to = new Date();
              to.setDate(to.getDate() + 7);
              return { from: now, to };
          }
          case "month": {
              const to = new Date();
              to.setMonth(to.getMonth() + 1);
              return { from: now, to };
          }
          case "other":
          default: {
              return { from: now, to: new Date(now) };
          }
      }
  };

  const [periodTime, periodTimeSet] = useState(() => getPeriodTimeBy(period));

  const handlePeriodTime = (period) => {
      periodTimeSet(getPeriodTimeBy(period));
      periodSet(period);
  };

  return (
      <Popup
          title={"New Budget"}
          show={show}
          onClose={() => showSet(false)}
          onSubmit={() => alert("submited")}
      >
          <Form className="c-form">
              <Form.Group className="mb-2">
                  <Form.Label>Budget Name</Form.Label>
                  <Form.Control type="text" value={budgetName} onChange={({ target: { value }}) => budgetNameSet(value)}></Form.Control>
              </Form.Group>
              <Form.Group className="mb-2">
                  <Form.Label>Category</Form.Label>
                  <div className="row">
                      <div className="col-9">
                          <MultipleSelect onChange={(data) => categorySet(data)} value={category} isMulti options={[{label: 'Ăn uống ', value: 'au'}, {label: 'Giải trí', value: 'gt'}]} />
                      </div>
                      <div className="col-3 d-flex align-items-center justify-content-center">
                          <div className="force-center">
                              <img
                                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiByeD0iMjUiIGZpbGw9IiNEOUQ5RDkiLz4KPC9zdmc+Cg=="
                                  className=""
                                  width={70}
                                  height={70}
                                  alt=""
                              />
                          </div>
                      </div>
                  </div>
              </Form.Group>
              <Form.Group className="mb-2">
                  <Form.Label>Initial amount</Form.Label>
                  <Form.Control type="text" value={initialAmount} onChange={({target: { value }}) => initialAmountSet(value)}></Form.Control>
              </Form.Group>
              <Form.Group className="mb-4">
                  <Form.Label>Wallet</Form.Label>
                  <MultipleSelect value={wallet} onChange={data => walletSet(data)} isMulti options={[{label: 'Tiền mặt', value: 'tm'}, {label: 'TP Bank', value: 'tpbank'}]} />
              </Form.Group>
              <Form.Group className="mb-3 d-flex align-items-center gap-3">
                  <Form.Label>Period</Form.Label>
                  <div className="d-flex gap-2">
                      <Button
                          onClick={() => handlePeriodTime("week")}
                          className={clsx("btn-light", {
                              active: period === "week",
                          })}
                          size="btn-sm"
                      >
                          Week
                      </Button>
                      <Button
                          onClick={() => handlePeriodTime("month")}
                          className={clsx("btn-light", {
                              active: period === "month",
                          })}
                          size="btn-sm"
                      >
                          Month
                      </Button>
                      <Button
                          onClick={() => handlePeriodTime("other")}
                          className={clsx("btn-light", {
                              active: period === "other",
                          })}
                          size="btn-sm"
                      >
                          Other
                      </Button>
                  </div>
              </Form.Group>
              <Form.Group className="mb-4">
                      {period === "other" && (
                          <div className="row mb-3">
                              <div className="col-6 d-flex align-items-center gap-2">
                                  <label class="form-label mb-0">Form</label>
                                  <input
                                      type="date"
                                      value={getInputDateFormat(
                                          periodTime.from
                                      )}
                                      onChange={({ target: { value } }) =>
                                          periodTimeSet((prv) => ({
                                              ...prv,
                                              from: new Date(value),
                                          }))
                                      }
                                      className="form-control form-control-sm"
                                  />
                              </div>
                              <div className="col-6 d-flex align-items-center gap-2">
                                  <label class="form-label  mb-0">To</label>
                                  <input
                                      type="date"
                                      onChange={({ target: { value } }) =>
                                          periodTimeSet((prv) => ({
                                              ...prv,
                                              to: new Date(value),
                                          }))
                                      }
                                      value={getInputDateFormat(
                                          periodTime.to
                                      )}
                                      className="form-control form-control-sm"
                                  />
                              </div>
                          </div>
                      )}
                      <p className="mb-0">
                          Start from <b>{getMonthAndDay(periodTime.from)}</b>{" "}
                          to <b>{getMonthAndDay(periodTime.to)}</b>{" "}
                      </p>
              </Form.Group>
              <Form.Group className="d-flex mb-2 align-items-center">
                  <div className="pe-4">
                      <div style={{ width: "min-content" }}>
                          <Form.Check
                              className="mb-0"
                              type="switch"
                              reverse
                              label="Repeat"
                              size={'lg'}
                              checked={repeat}
                              onChange={({target: { checked }}) => repeatSet(checked)}
                          ></Form.Check>
                      </div>
                  </div>
                  <div className="d-flex gap-2 align-items-center">
                      <Form.Label
                          className="mb-0"
                          style={{ whiteSpace: "nowrap" }}
                      >
                          Number of iterations
                      </Form.Label>
                      <Form.Control size="sm" type="number" value={numberIterations} onChange={({target: { value }}) => numberIterationsSet(parseInt(value))}></Form.Control>
                  </div>
              </Form.Group>
              <Form.Group className="mb-2">
                  <Form.Label>Note</Form.Label>
                  <Form.Control as="textarea" value={note} onChange={({target: { value }}) => noteSet(value)}></Form.Control>
              </Form.Group>
          </Form>
      </Popup>
  );
};

export default CreateBudget