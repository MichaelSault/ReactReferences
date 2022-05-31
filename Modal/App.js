import { LargeProductListItem } from "./products/LargeProductListItem";
import { Modal } from "./Modal";

const people = [{
  name: 'John Doe',
  age: 54,
  hairColor: 'brown',
  hobbies: ['swimming', 'bicycling', 'running'],
}, {
  name: 'Brenda Smith',
  age: 33,
  hairColor: 'black',
  hobbies: ['bowling', 'mathematics', 'skiing'],
}, {
  name: 'Jane Garcia',
  age: 27,
  hairColor: 'blonde',
  hobbies: ['chemistry', 'physics', 'gymnastics'],
}];

const products = [{
  name: 'Flat Screen TV',
  price: '$300',
  description: '4k LCD Screen',
  rating: 3.5,
}, {
  name: 'Nintendo Switch',
  price: '$450',
  description: 'Why is it more than the TV',
  rating: 4.8,
}, {
  name: 'HD Speakers',
  price: '$200',
  description: 'Decent quality, don\'t be a snob',
  rating: 2.7,
}];

function App(){
  return(
    <>
    <Modal>
      <LargeProductListItem product={products[1]}/>
    </Modal>
    </>
  );
}

export default App;