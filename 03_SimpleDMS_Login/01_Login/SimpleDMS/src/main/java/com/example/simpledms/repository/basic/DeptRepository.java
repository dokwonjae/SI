package com.example.simpledms.repository.basic;

import com.example.simpledms.model.entity.basic.Dept;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * packageName : com.example.simpledms.repository.basic
 * fileName : DeptRepository
 * author : GGG
 * date : 2023-10-23
 * description : JPA CRUD 인터페이스
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-10-23         GGG          최초 생성
 */
@Repository
public interface DeptRepository extends JpaRepository<Dept, Integer> {
    //    dname like : 쿼리메소드 + 페이징(리턴:Page, 매개변수:Pageable)
    Page<Dept> findAllByDnameContaining(String dname, Pageable pageable);
}
