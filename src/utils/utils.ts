import moment from 'moment';

export let dateFormatter = function (date: Date) {
    return (moment(date)).format('dd.MM.yyyy')
};

// export let getIndexOfElement = function (element: Object, array: Array<Object>) {
//     for(let i=0; i<array.length; i++){
//         if (element === array[i]) {
//             return i;
//         }
//     }
// };

