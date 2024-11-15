// import logo from './logo.svg';
import ResponsiveFormikForm from './components/form';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import { SnackbarProvider } from 'notistack';


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
   
     
        <SnackbarProvider maxSnack={3}>
        <ResponsiveFormikForm/>
        </SnackbarProvider>
    
        
    
  );
}

export default App;
