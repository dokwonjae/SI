package com.example.simpledms.repository.shop;

import com.example.simpledms.model.entity.shop.SimpleProduct;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * packageName : com.example.simpledms.repository.shop
 * fileName : SimpleProductRepository
 * author : GGG
 * date : 2023-11-08
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-08         GGG          최초 생성
 */
public interface SimpleProductRepository extends JpaRepository<SimpleProduct, Integer> {
//  like 검색 : 쿼리메소드(JPQL)
    Page<SimpleProduct> findAllByTitleContaining(String title, Pageable pageable);
}
