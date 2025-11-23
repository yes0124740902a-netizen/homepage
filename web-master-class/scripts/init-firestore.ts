import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCQSco8jRHONMJexeTqfdpv7_VzvoWFpr8",
  authDomain: "test-8cbc3.firebaseapp.com",
  projectId: "test-8cbc3",
  storageBucket: "test-8cbc3.firebasestorage.app",
  messagingSenderId: "717613632012",
  appId: "1:717613632012:web:657720345376f07f5b3c29",
  measurementId: "G-8FK3G00SGD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function initializeFirestore() {
  try {
    console.log('🔥 Initializing Firestore with sample data...');

    // Create sample products
    const products = [
      {
        id: 'prod-001',
        name: '웹마스터 클래스 - 기본 과정',
        description: '비전공자를 위한 웹사이트 제작 기초 과정',
        price: 299000,
        category: 'course',
        image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800',
        stock: 100,
        sales: 45,
        status: 'active',
        features: [
          '6주 완성 커리큘럼',
          '1:1 멘토링 제공',
          '평생 수강 가능',
          '수료증 발급'
        ]
      },
      {
        id: 'prod-002',
        name: '웹마스터 클래스 - 심화 과정',
        description: '실전 프로젝트로 배우는 고급 웹 개발',
        price: 499000,
        category: 'course',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
        stock: 50,
        sales: 23,
        status: 'active',
        features: [
          '8주 집중 과정',
          '포트폴리오 제작',
          '취업 지원',
          '평생 업데이트'
        ]
      },
      {
        id: 'prod-003',
        name: '웹마스터 클래스 - 올인원 패키지',
        description: '기본 + 심화 + 프리미엄 멘토링',
        price: 699000,
        category: 'package',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
        stock: 30,
        sales: 67,
        status: 'active',
        features: [
          '기본 + 심화 과정 포함',
          '12주 프리미엄 멘토링',
          '1:1 프로젝트 리뷰',
          '취업 추천서 제공'
        ]
      }
    ];

    console.log('📦 Creating products...');
    for (const product of products) {
      await setDoc(doc(db, 'products', product.id), {
        ...product,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      console.log(`  ✓ Created product: ${product.name}`);
    }

    // Create sample users
    const users = [
      {
        id: 'user-001',
        name: '김철수',
        email: 'user1@example.com',
        provider: 'email',
        grade: 'Gold',
        joinDate: new Date('2024-01-15').toISOString(),
        totalPurchase: 499000,
        orderCount: 2
      },
      {
        id: 'user-002',
        name: '이영희',
        email: 'user2@example.com',
        provider: 'google',
        grade: 'Silver',
        joinDate: new Date('2024-02-20').toISOString(),
        totalPurchase: 299000,
        orderCount: 1
      },
      {
        id: 'user-003',
        name: '박민수',
        email: 'user3@example.com',
        provider: 'email',
        grade: 'Bronze',
        joinDate: new Date('2024-03-10').toISOString(),
        totalPurchase: 0,
        orderCount: 0
      }
    ];

    console.log('👥 Creating users...');
    for (const user of users) {
      await setDoc(doc(db, 'users', user.id), {
        ...user,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      console.log(`  ✓ Created user: ${user.name}`);
    }

    // Create sample orders
    const orders = [
      {
        orderNumber: 'ORD-2024-001',
        orderDate: new Date('2024-11-01').toISOString(),
        status: 'paid',
        paymentKey: 'test_payment_key_001',
        userId: 'user-001',
        userName: '김철수',
        userEmail: 'user1@example.com',
        items: [
          {
            productId: 'prod-001',
            productName: '웹마스터 클래스 - 기본 과정',
            quantity: 1,
            price: 299000
          }
        ],
        totalAmount: 299000
      },
      {
        orderNumber: 'ORD-2024-002',
        orderDate: new Date('2024-11-15').toISOString(),
        status: 'paid',
        paymentKey: 'test_payment_key_002',
        userId: 'user-002',
        userName: '이영희',
        userEmail: 'user2@example.com',
        items: [
          {
            productId: 'prod-002',
            productName: '웹마스터 클래스 - 심화 과정',
            quantity: 1,
            price: 499000
          }
        ],
        totalAmount: 499000
      },
      {
        orderNumber: 'ORD-2024-003',
        orderDate: new Date('2024-11-20').toISOString(),
        status: 'paid',
        paymentKey: 'test_payment_key_003',
        userId: 'user-001',
        userName: '김철수',
        userEmail: 'user1@example.com',
        items: [
          {
            productId: 'prod-003',
            productName: '웹마스터 클래스 - 올인원 패키지',
            quantity: 1,
            price: 699000
          }
        ],
        totalAmount: 699000
      },
      {
        orderNumber: 'ORD-2024-004',
        orderDate: new Date('2024-11-22').toISOString(),
        status: 'pending',
        paymentKey: 'test_payment_key_004',
        userId: 'user-002',
        userName: '이영희',
        userEmail: 'user2@example.com',
        items: [
          {
            productId: 'prod-001',
            productName: '웹마스터 클래스 - 기본 과정',
            quantity: 1,
            price: 299000
          }
        ],
        totalAmount: 299000
      }
    ];

    console.log('📋 Creating orders...');
    for (const order of orders) {
      const orderRef = doc(collection(db, 'orders'));
      await setDoc(orderRef, {
        ...order,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      console.log(`  ✓ Created order: ${order.orderNumber}`);
    }

    console.log('\n✅ Firestore initialization completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`  - Products: ${products.length}`);
    console.log(`  - Users: ${users.length}`);
    console.log(`  - Orders: ${orders.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing Firestore:', error);
    process.exit(1);
  }
}

initializeFirestore();
