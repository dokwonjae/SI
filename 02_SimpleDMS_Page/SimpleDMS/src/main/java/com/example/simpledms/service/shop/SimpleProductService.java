package com.example.simpledms.service.shop;


import com.example.simpledms.model.entity.shop.SimpleProduct;
import com.example.simpledms.repository.shop.SimpleProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * packageName : com.example.simpledms.service.shop
 * fileName : SimpleProductService
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
@Service
public class SimpleProductService {

    @Autowired
    SimpleProductRepository simpleProductRepository; // DI

    //    title like 검색
    public Page<SimpleProduct> findAllByTitleContaining(String title, Pageable pageable) {
        Page<SimpleProduct> page
                = simpleProductRepository.findAllByTitleContaining(title, pageable);

        return page;
    }

    //    상세조회(1건조회)
    public Optional<SimpleProduct> findById(int spno) {
        Optional<SimpleProduct> optionalSimpleProduct
                = simpleProductRepository.findById(spno);

        return optionalSimpleProduct;
    }

    //    저장함수(수정함수)
    public SimpleProduct save(SimpleProduct simpleProduct) {

        SimpleProduct simpleProduct2 = simpleProductRepository.save(simpleProduct);

        return simpleProduct2; // 저장된 객체
    }
}
