---
layout: post
title: ORM과 Stored Procedure
featured-img: Hibernate_logo_a.png
categories: DB
---

DB에 저장된 자료를 다루기 위해서는 쿼리를 이용합니다. 어플리케이션에서도 DB의 자료를 다루기 위해서는 쿼리를 사용해야 합니다. 하지만 단순한 쿼리 외에도 Code 에서 DB를 다루는 몇 가지 방법은 다음과 같습니다.

## SQL Statements

가장 근본적으로 쿼리를 이용해 직접 DB를 다루는 방법입니다. 쿼리문도 문자열이기에 String 타입으로 쿼리 문을 작성 후 이를 DB에 요청하여 결과값을 받아오는 것입니다. 고전적인 방식이지만 쉽고 직관적이며 DB에서 사용한 쿼리를 그래도 사용할 수 있다는 장점이 있습니다.

하지만 SQL 인젝션과 같은 보안 취약점이 존재하며, 쿼리문을 직접 코드에 삽입하기 때문에 DB 구조가 노출될 위험성이 있습니다. 또한 DB의 종류에 따라 사용하는 방법이 조금씩 다르기 때문에 각각의 DB의 특성과 사용법을 숙지할 필요가 있습니다.

다음은 자바에서 MSSQL 서버에 쿼리 구문을 이용하여 직접 데이터를 가져오는 예제입니다.

```java
// Create a variable for the connection string.
String connectionUrl = "jdbc:sqlserver://<server>:<port>;databaseName=AdventureWorks;user=<user>;password=<password>";
try (Connection con = DriverManager.getConnection(connectionUrl); Statement stmt = con.createStatement();) {
    String SQL = "SELECT TOP 10 * FROM Person.Contact";
    ResultSet rs = stmt.executeQuery(SQL);

    // Iterate through the data in the result set and display it.
    while (rs.next()) {
        System.out.println(rs.getString("FirstName") + " " + rs.getString("LastName"));
    }
}
// Handle any errors that may have occurred.
catch (SQLException e) {
    e.printStackTrace();
}
```

> 출처: <https://docs.microsoft.com/en-us/sql/connect/jdbc/connection-url-sample?view=sql-server-ver15>

## SQL Mapper

SQL Mapper는 DB의 쿼리문을 객체지향 형태의 함수로 맵핑해주는 기술입니다. 코드에서 함수를 호출하면 이에 맵핑된 SQL 쿼리문이 호출되어 DB와의 상호작용을 하게 됩니다. 생짜로 쿼리문을 쓰는 것과 비교했을 때, 코드 자체에 쿼리문이 드러나지 않기에 코드를 깔끔하게 만들 수 있고, 코드와 쿼리를 분리하여 비즈니스 로직과 영속성 부문을 분리할 수 있게 됩니다. 또한 쿼리문을 직접 사용하는게 아니라 보안성 측면에서도 장점이 있습니다.

![Mybatis](/assets/img/posts/database-logic/mybatis-logo.png)

SQL 매핑 프레임워크로는 JAVA의 Mybatis가 있습니다. Mybatis의 경우 JAVA에서는 쿼리 호출부를 작성하고 실제 쿼리는 XML형태의 설정 파일에 작성합니다.

다음은 XML로 쿼리를 작성한 예시입니다.

```xml
<select id="selectPerson" parameterType="int" resultType="hashmap">
  SELECT * FROM PERSON WHERE ID = #{id}
</select>
```

> 출처: <https://mybatis.org/mybatis-3/configuration.html>

## Stored Procedure

Stored Procedure(이하 저장 프로시저)란 미리 준비된 SQL 코드를 데이터베이스에 저장해놓고 이를 함수처럼 호출하는 방식을 의미합니다. 쿼리가 DB에 저장되어 있기 때문에 DB 구조같은 내용이 외부로 노출될 위험이 적어 보안성에서 좋으며, 호출 시 프로시저 명만 사용하기 때문에 네트워크 트래픽이 적어지게 됩니다. 또한, DB에서 저장된 코드를 불러내여 실행하기 때문에 실행 속도가 매우 빠르다는 장점이 있습니다.

다음은 MSSQL에서 저장 프로시저를 작성한 예시입니다.

```sql
USE AdventureWorks2012;  
GO  
CREATE PROCEDURE HumanResources.uspGetEmployeesTest2
    @LastName nvarchar(50),
    @FirstName nvarchar(50)
AS

    SET NOCOUNT ON;  
    SELECT FirstName, LastName, Department  
    FROM HumanResources.vEmployeeDepartmentHistory  
    WHERE FirstName = @FirstName AND LastName = @LastName  
    AND EndDate IS NULL;  
GO  
```

> 출처: <https://docs.microsoft.com/en-us/sql/relational-databases/stored-procedures/create-a-stored-procedure?view=sql-server-ver15>

## Object-Relation Mapping

객체관계 맵핑 프레임워크(이하 ORM 프레임워크)은 객체와 RDBMS의 테이블 구조를 맵핑해주는 역할을 합니다. 쉽게 말해서 객체 하나를 DB의 Row처럼 다룰 수 있습니다. 개발자는 맵핑 설정을 한 다음에는 순수하게 비즈니스 로직의 관점에서 데이터를 다루고 영속성과 관련된 부문은 ORM 프레임워크가 처리해줍니다. 개발자가 쿼리를 별도로 작성할 필요가 없으며, DB와 관련된 비즈니스 로직은 모두 코드에서 처리하게 됩니다. 쿼리문은 프레임워크에서 생성해주기 때문에 DB의 종류에 독립적이라는 장점이 있습니다.

![Hibernate](/assets/img/posts/database-logic/Hibernate_logo_a.png)

대표적인 ORM 프레임워크는 Hibernate, Entity Framework, Spring JPA 등이 있습니다.

다음은 Spring JPA에서의 DB Select 예시입니다.

```java
public interface UserRepository extends Repository<User, Long> {

  List<User> findByEmailAddressAndLastname(String emailAddress, String lastname);
}
```

> 출처: <https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repositories.query-methods>

## ORM VS SP

ORM에서도 저장 프로시저를 사용할 수 있고 SP를 사용한다고 해서 ORM이나 SQL Mapper를 사용할 수 없는 것은 아닙니다. 하지만 같은 기능을 하는 여러 가지 기술을 동시에 사용한다면 일관성이 떨어지기 때문에 유지 보수성에서 좋은 선택은 아닙니다.

최근에 대세가 된 기술은 ORM으로 한국보다는 해외에서 좀 더 널리 쓰이고 있었습니다만, 한국에서도 생산성 등의 이유로 좀 더 보편화되고 있는 추세입니다.

ORM이 저장 프로시저에 비해 갖는 장점들은 다음과 같습니다.

* 비즈니스 로직을 DB가 아닌 프로그램 코드에 모으기 때문에, 로직의 파편화가 적어진다.
* DB와의 상호작용 역시 테스트가 필요한데, 저장 프로시저에 비해 테스트 구성이 쉽다.
* Git과 같은 버전 관리 시스템에서 관리가 편하며, 이력 추적이 용이하다.
* DB 종류에 독립적이기 때문에 특정 DB만을 사용해야 할 이유가 적어진다.
* 추상화가 잘 되어 있으며, 개발자가 상대적으로 DB에 대한 지식이 적어도 된다.
* 로직의 재사용성이 증가하고, 유지보수가 쉽다.
* 기존 CI/CD 파이프라인을 사용하여 배포 관리가 가능하다.

ORM의 큰 장점은 생산성이 좋다는 점입니다. 현대 개발 패러다임이 성능보다는 생산성 중심이 되어가고 있기 때문에 이 점은 무시할 수 없을 정도로 큰 장점입니다. 쉬운 디버깅, 버전 관리, 이력 추적 및 여기에서 따라오는 생산성은 극한의 튜닝을 통해 성능을 쥐어짜야 하는 서비스가 아니라면 ORM을 더 매력적인 선택지로 만들어 줍니다.

반면 저장 프로시저의 경우에도 ORM과 비교하여 다음과 같은 장점이 있습니다.

* 쿼리가 아닌 프로시저명을 받기 때문에 상대적으로 네트워크 트래픽이 적다.
* DB에서 로직을 직접 실행시키기 때문에 속도가 매우 빠르다.
* 특정 DB에서 제공하는 세밀한 기능들을 직접 사용할 수 있다.
* DB 로직만 수정할 경우, 컴파일이 필요없이 바로 데이터베이스에 업데이트할 수 있다.
* 디버깅이 쉽다.

ORM 프레임워크를 사용한다고 해서 DB에 대한 지식이 소홀해져도 상관없다는 것은 아닙니다. 오히려 DB를 잘 알아야 ORM을 더 잘 사용할 수 있습니다. 하지만 프로시저의 경우, 로직을 DB 자체에서 처리하기 때문에 특정 DB에 통달한 DBA가 아니라면 성능에서의 장점을 크게 얻기 힘듭니다.

예전에는 프로시저 방식의 개발을 많이 수행했으며, 금융권 쪽과 같은 몇몇 분야에서는 아직도 이런 식으로의 개발을 많이 하고 있습니다. 하지만 개발 환경에서 협업의 중요성이 날이 갈수록 중요해지고 있기에 협업 환경에 불리한 프로시저 방식은 잘 사용되지 않습니다.

데이터베이스는 매우 비싼 자원입니다. 수평적 확장이 쉬운 서버 쪽 자원에 비해, DB는 스케일 아웃이 힘듭니다. 로직을 데이터베이스 자체에 넣을 경우, DB의 부하가 매우 커지게 되며, 병목 현상이 발생하거나 DB가 뻗을 가능성이 커집니다. DB를 잘 튜닝하거나 쿼리를 최적화하여 한 번에 로직을 실행시켜 빠르게 원하는 값을 얻을 수 있다면, ORM을 이용하여 많은 DB 트랜잭션을 만드는 것보다 좋을 수도 있습니다. 좋은 개발자, DBA라면 서비스에 적합한 요소를 고려하여 기술을 선택하는 것이 현명할 것입니다.
