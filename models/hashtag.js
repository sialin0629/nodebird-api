const Sequelize = require('sequelize'); // Sequelize 모듈

class Hashtag extends Sequelize.Model { // Hashtag 모델을 정의하는 클래스
  static initiate(sequelize) { // 모델을 초기화하는 정적 메서드, 매개변수: sequelize 인스턴스
    Hashtag.init({
      title: { // title 필드
        type: Sequelize.STRING(15), // 최대 15자의 문자열 타입
        allowNull: false, // null 값 허용 X
        unique: true, // title: 고유값  
      },
    }, {
      sequelize, // Sequelize 인스턴스 연결
      timestamps: true, // createdAt, updatedAt 타임스탬프 자동 추가
      modelName: 'Hashtag', // 모델 이름을 'Hashtag'로 설정
      tableName: 'hashtags', // 테이블 이름을 'hashtags'로 설정
      paranoid: false, // deletedAt 타임스탬프 추가 X (소프트 삭제 비활성화)
      charset: 'utf8', // 테이블의 문자 집합을 UTF-8로 설정
      collate: 'utf8_general_ci', // 테이블의 정렬 기준을 UTF-8 일반 대소문자 구분없이 설정
    });  
  }
  
  static associate(db) {  // 다른 모델과의 연관 관계 설정
    db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
    // Hashtag 모델은 여러 Post 모델과 다대다 관계
    // 중간 테이블 'PostHashtag'를 통해 설정됨.
  }
}

module.exports = Hashtag; // Post 모델을 모듈로 내보냄.