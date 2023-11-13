package com.example.simpledms.repository.basic;

import com.example.simpledms.model.entity.basic.Dept;
import com.example.simpledms.model.entity.basic.Emp;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * packageName : com.example.simpledms.repository.basic
 * fileName : EmpRepository
 * author : GGG
 * date : 2023-10-23
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-10-23         GGG          최초 생성
 */
@Repository
public interface EmpRepository extends JpaRepository<Emp, Integer> {
    //    ename like : 쿼리메소드 + 페이징(리턴:Page, 매개변수:Pageable)
    Page<Emp> findAllByEnameContaining(String ename, Pageable pageable);
}
