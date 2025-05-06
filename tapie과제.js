let cart = [];  // 장바구니 배열
let isLoggedIn = false;  // 로그인 상태 추적

// 로그인 기능
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // 로그인이 성공하면
    alert("로그인 성공!");
    isLoggedIn = true;
    document.getElementById('user-info').textContent = `안녕하세요! ${username}님`;
    document.getElementById('loginBtn').style.display = 'none';  // 로그인 버튼 숨기기
    document.getElementById('logoutBtn').style.display = 'block';  // 로그아웃 버튼 보이기
    closeLoginModal();
}

// 로그아웃 기능
function logout() {
    isLoggedIn = false;
    document.getElementById('user-info').textContent = '';
    document.getElementById('loginBtn').style.display = 'block';
    document.getElementById('logoutBtn').style.display = 'none';
}

// 로그인 모달 열기
document.getElementById("loginBtn").addEventListener("click", function() {
    document.getElementById("loginModal").style.display = "block";
});

// 로그인 모달 닫기
document.getElementById("closeModal").addEventListener("click", function() {
    document.getElementById("loginModal").style.display = "none";
});

// 로그인 모달 닫기 함수
function closeLoginModal() {
    document.getElementById("loginModal").style.display = "none";
}

// 장바구니에 상품 추가 (로그인한 경우에만)
function addToCart(productName, price) {
    if (!isLoggedIn) {
        alert("장바구니에 담기 위해서는 로그인이 필요합니다.");
        return;
    }

    cart.push({ name: productName, price: price });
    alert(`${productName}가 장바구니에 추가되었습니다!`);
}

// 장바구니 버튼 클릭 시 모달 열기 및 렌더링
document.getElementById("cartBtn").addEventListener('click', function () {
    renderCart();
    document.getElementById("cartModal").style.display = "block";
});

// 장바구니 모달 닫기
document.getElementById("closeCartModal").addEventListener("click", function() {
    document.getElementById("cartModal").style.display = "none";
});

// 로그아웃 버튼 클릭 시 로그아웃
document.getElementById("logoutBtn").addEventListener("click", logout);

// 장바구니 렌더링 함수 (삭제 버튼 포함)
function renderCart() {
    const cartItemsList = document.getElementById('cartItems');
    cartItemsList.innerHTML = '';  // 초기화

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price}원`;

        // 삭제 버튼 생성
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '삭제';
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.style.backgroundColor = 'red';
        deleteBtn.style.color = 'white';
        deleteBtn.style.border = 'none';
        deleteBtn.style.cursor = 'pointer';

        deleteBtn.addEventListener('click', function () {
            cart.splice(index, 1); // 해당 상품 삭제
            renderCart(); // 장바구니 다시 렌더링
        });

        li.appendChild(deleteBtn);
        cartItemsList.appendChild(li);
    });
}
