const mongoose = require("mongoose");

const DB ="mongodb+srv://ketan:ketan0902@cluster0.o69bvjv.mongodb.net/dharmik?retryWrites=true&w=majority&appName=Cluster0rrr";

mongoose
  .connect(DB, {
    // useUnifiedTopology: true,
    // useNewUrlParser: true
  })
  .then(() => console.log("DataBase Connected ddd--"))
  .catch((errr) => {
    console.log(errr, "not connected in db (conn.js)");
  });
class  extends Component {
  state = {  } 
  render() { 
    return ();
  }
}
 
export default ;