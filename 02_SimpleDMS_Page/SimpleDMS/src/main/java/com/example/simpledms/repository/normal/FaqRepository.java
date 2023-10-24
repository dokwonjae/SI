package com.example.simpledms.repository.normal;

import com.example.simpledms.model.entity.normal.Faq;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

/**
 * packageName : com.example.simpledms.repository.normal
 * fileName : FaqRepository
 * author : GGG
 * date : 2023-10-24
 * description : Faq CRUD 레포
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-10-24         GGG          최초 생성
 */
@Repository
public interface FaqRepository extends JpaRepository<Faq, Integer> {
    //    title like 검색
    Page<Faq> findAllByTitleContaining(String title, Pageable pageable);
}