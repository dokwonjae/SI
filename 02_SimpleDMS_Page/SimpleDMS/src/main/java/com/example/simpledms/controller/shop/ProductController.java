package com.example.simpledms.controller.shop;

import com.example.simpledms.model.entity.shop.Product;
import com.example.simpledms.service.shop.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * packageName : com.example.simpledms.controller.shop
 * fileName : ProductController
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
    public class ProductController {

        @Autowired
        ProductService productService; // DI

        //    like 검색
        @GetMapping("/product")
        public ResponseEntity<Object> findAllByPnameContaining(
                @RequestParam(defaultValue = "") String pname,
                @RequestParam(defaultValue = "0") int page,
                @RequestParam(defaultValue = "3") int size
        ) {
            try {
                Pageable pageable = PageRequest.of(page, size);

                Page<Product> productPage
                        = productService
                        .findAllByPnameContaining(pname, pageable);

                Map<String, Object> response = new HashMap<>();
                response.put("product", productPage.getContent()); // Product 배열
                response.put("currentPage", productPage.getNumber()); // 현재페이지번호
                response.put("totalItems", productPage.getTotalElements()); // 총건수(개수)
                response.put("totalPages", productPage.getTotalPages()); // 총페이지수

                if (productPage.isEmpty() == false) {
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
    }
