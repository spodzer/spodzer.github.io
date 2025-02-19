function selectDish(name, desc, price, element) {
    document.getElementById('dish-name').textContent = name;
    document.getElementById('dish-desc').textContent = desc;
    document.getElementById('dish-price').textContent = price;
    document.getElementById('dish-info').style.display = 'block';
    document.querySelectorAll('.dish-gallery img').forEach(img => img.parentElement.classList.remove('selected'));
    element.parentElement.classList.add('selected');
}
let totalPrice = 0;
function addToMeal(dish, price) {
    const mealList = document.getElementById('meal-list');
    const item = document.createElement('li');
    item.textContent = `${dish} - $${price.toFixed(2)}`;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = function() {
        mealList.removeChild(item);
        totalPrice -= price;
        document.getElementById('total-price').textContent = totalPrice.toFixed(2);
    };
    item.appendChild(removeBtn);
    mealList.appendChild(item);
    totalPrice += price;
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}