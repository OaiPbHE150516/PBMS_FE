import React, {useState} from 'react'
import MultipleSelect from '../MultipleSelect';
import Popup from '../Popup';
import Form from 'react-bootstrap/Form';

const UpdateBudget = ({show, onClose}) => {
  const [budgetName, budgetNameSet] = useState('')
  const [category, categorySet] = useState([{label: 'Ăn uống ', value: 'au'}, {label: 'Giải trí', value: 'gt'}])
  const [initialAmount, initialAmountSet] = useState('')
  const [wallet, walletSet] = useState([{label: 'Tiền mặt', value: 'tm'}, {label: 'TP Bank', value: 'tpbank'}])
  const [note, noteSet] = useState('')

  return (
      <Popup
          title={"Update Budget"}
          show={show}
          onClose={() => onClose()}
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
              <Form.Group className="mb-2">
                  <Form.Label>Note</Form.Label>
                  <Form.Control as="textarea" value={note} onChange={({target: { value }}) => noteSet(value)}></Form.Control>
              </Form.Group>
          </Form>
      </Popup>
  );
};

export default UpdateBudget