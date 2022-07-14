import { RegularList } from "./RegularList";
import { NumberedList } from "./NumberedList";
import { SmallPersonListItem } from "./people/SmallPersonListItem";
import { LargePersonListItem } from "./people/LargePersonListItem";
import { SmallProductListItem } from "./products/SmallProductListItem";
import { LargeProductListItem } from "./products/LargeProductListItem";

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
  raiting: 4.8,
}, {
  name: 'HD Speakers',
  price: '$200',
  description: 'Decent quality, don\'t be a snob',
  rating: 2.7,
}];

function App(){
  return(
    <>
      <RegularList
        items={people}
        resourceName="person"
        itemComponent={SmallPersonListItem}/>
      <NumberedList
        items={people}
        resourceName="person"
        itemComponent={LargePersonListItem}/>
      <RegularList
        items={products}
        resourceName="product"
        itemComponent={SmallProductListItem}/>
      <NumberedList
        items={products}
        resourceName="product"
        itemComponent={LargeProductListItem}/>
    </>
  );
}

export default App;