// import logo from './logo.svg';
import ResponsiveFormikForm from './components/form';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';



{/* <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" /> */}

// import { useAppDispatch, useAppSelector } from './redux/hooks';
// import { increment ,decrement} from './redux/slices/counter';
// import Counter from './components/count';
// import { useDispatch } from 'react-redux';

function App() {
  // const dispatch = useDispatch();
  // const count = useAppSelector((state) => state.counter.value); 
  // const dispatch=useAppDispatch(); // Accessing `value`

  return (
    <div className="App ">
      {/* <header className="App-header"> */}
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <ResponsiveFormikForm/>
        
        {/* <h1>Count is {count}</h1> */}
        {/* <Counter/>
        <button onClick={() => dispatch({type:'INCREMENT'})}>Increment</button>
        <button onClick={() => dispatch({type:'DECREMENT'})}>Decrement</button> */}
      {/* </header> */}
    </div>
  );
}

export default App;
