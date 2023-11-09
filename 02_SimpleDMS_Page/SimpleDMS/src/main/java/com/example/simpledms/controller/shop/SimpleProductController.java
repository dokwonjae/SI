package com.example.simpledms.controller.shop;

import com.example.simpledms.model.entity.basic.Dept;
import com.example.simpledms.model.entity.shop.SimpleProduct;
import com.example.simpledms.service.shop.SimpleProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * packageName : com.example.simpledms.controller.shop
 * fileName : SimpleProductController
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
@Slf4j
@RestController
@RequestMapping("/api/shop")
public class SimpleProductController {

    @Autowired
    SimpleProductService simpleProductService; // DI

    //    like 검색
    @GetMapping("/simple-product")
    public ResponseEntity<Object> findAllByTitleContaining(
            @RequestParam(defaultValue = "") String title,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size);

            Page<SimpleProduct> simpleProductPage
                    = simpleProductService
                    .findAllByTitleContaining(title, pageable);

            Map<String, Object> response = new HashMap<>();
            response.put("simpleProduct", simpleProductPage.getContent()); // simpleProduct 배열
            response.put("currentPage", simpleProductPage.getNumber()); // 현재페이지번호
            response.put("totalItems", simpleProductPage.getTotalElements()); // 총건수(개수)
            response.put("totalPages", simpleProductPage.getTotalPages()); // 총페이지수

            if (simpleProductPage.isEmpty() == false) {
//                성공
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
//                데이터 없음
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //    저장 함수
    @PostMapping("/simple-product")
    public ResponseEntity<Object> create(@RequestBody SimpleProduct simpleProduct) {

        try {
            SimpleProduct simpleProduct2 = simpleProductService.save(simpleProduct); // db 저장

            return new ResponseEntity<>(simpleProduct2, HttpStatus.OK);
        } catch (Exception e) {
//            DB 에러가 났을경우 : INTERNAL_SERVER_ERROR 프론트엔드로 전송
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //    수정 함수
    @PutMapping("/simple-product/{spno}")
    public ResponseEntity<Object> update(
            @PathVariable int spno,
            @RequestBody SimpleProduct simpleProduct) {

        try {
            SimpleProduct simpleProduct2
                    = simpleProductService.save(simpleProduct); // db 수정

            return new ResponseEntity<>(simpleProduct2, HttpStatus.OK);
        } catch (Exception e) {
//            DB 에러가 났을경우 : INTERNAL_SERVER_ERROR 프론트엔드로 전송
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 상세조회
    @GetMapping("/simple-product/{spno}")
    public ResponseEntity<Object> findById(@PathVariable int spno) {

        try {
//            상세조회 실행
            Optional<SimpleProduct> optionalSimpleProduct
                    = simpleProductService.findById(spno);

            if (optionalSimpleProduct.isPresent()) {
//                성공
                return new ResponseEntity<>(optionalSimpleProduct.get(), HttpStatus.OK);
            } else {
//                데이터 없음
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
//            서버 에러
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}