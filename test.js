const array = [{a: "1"}, {a: "2"}];

const element = array.find(e => e.a == 1);

array.forEach((e, i) => {
    if (e == element) {
        console.log(e, i, true);
    }
});