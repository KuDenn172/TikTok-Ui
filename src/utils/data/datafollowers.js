const { ref, get, child, set } = require('firebase/database');
const { default: database } = require('~/firebase');

// Hàm ref được sử dụng để trỏ đến Firebase Realtime Database
// get được sử dụng để đọc dữ liệu từ database
// child được sử dụng để trỏ đến một nút con trong Firebase Realtime Database.

// truyền đường dẫn "followers" vào hàm child để trỏ đến nút con "followers".
//  Sau đó get để đọc dữ liệu từ nút "followers".

const dbRef = ref(database);
export const getData = (getData) => {
    return  get(child(dbRef, getData))
        // snapshot chứa dữ liệu của nút "followers"
        .then((snapshot) => {
            // snapshot.exists() để kiểm tra xem nút "followers" có tồn tại hay không,
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                console.log('No data available');
                return null;
            }
        })
        .catch((error) => {
            console.error(error);
        });
};

