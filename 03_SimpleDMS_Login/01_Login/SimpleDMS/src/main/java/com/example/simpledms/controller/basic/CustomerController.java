package com.example.simpledms.controller.basic;
import com.example.simpledms.model.entity.basic.Customer;
import com.example.simpledms.service.basic.CustomerService;
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
 * packageName : com.example.simpledms.controller.basic
 * fileName : CustomerController
 * author : GGG
 * date : 2023-10-24
 * description :  Customer 컨트롤러
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-10-24         GGG          최초 생성
 */
@Slf4j
@RestController
@RequestMapping("/api/basic")
public class CustomerController {

    @Autowired
    CustomerService customerService; // DI

    //    전체 조회 + question/questioner like 검색
    @GetMapping("/customer")
    public ResponseEntity<Object> findAllByContaining(
            @RequestParam(defaultValue = "customer") String searchSelect,
            @RequestParam(defaultValue = "") String searchKeyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
    ){
        try {
            Pageable pageable = PageRequest.of(page, size);

            Page<Customer> customerPage; // customer 페이지 정의

            if(searchSelect.equals("fullName")) {
                //            customer like 검색
                customerPage = customerService.findAllByFullNameContaining(searchKeyword, pageable);
            } else {
                //            customer like 검색
                customerPage = customerService.findAllByEmailContaining(searchKeyword, pageable);
            }

//          리액트 전송 : customer배열 , 페이징정보 [자료구조 : Map<키이름, 값>]
            Map<String , Object> response = new HashMap<>();
            response.put("customer", customerPage.getContent()); // customer배열
            response.put("currentPage", customerPage.getNumber()); // 현재페이지번호
            response.put("totalItems", customerPage.getTotalElements()); // 총건수(개수)
            response.put("totalPages", customerPage.getTotalPages()); // 총페이지수

            if (customerPage.isEmpty() == false) {
//                성공
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
//                데이터 없음
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //    저장 함수
    @PostMapping("/customer")
    public ResponseEntity<Object> create(@RequestBody Customer customer) {

        try {
            Customer customer2 = customerService.save(customer); // db 저장

            return new ResponseEntity<>(customer2, HttpStatus.OK);
        } catch (Exception e) {
//            DB 에러가 났을경우 : INTERNAL_SERVER_ERROR 프론트엔드로 전송
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //    수정 함수
    @PutMapping("/customer/{cid}")
    public ResponseEntity<Object> update(
            @PathVariable int cid,
            @RequestBody Customer customer) {

        try {
            Customer customer2 = customerService.save(customer); // db 수정

            return new ResponseEntity<>(customer2, HttpStatus.OK);
        } catch (Exception e) {
//            DB 에러가 났을경우 : INTERNAL_SERVER_ERROR 프론트엔드로 전송
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 상세조회
    @GetMapping("/customer/{cid}")
    public ResponseEntity<Object> findById(@PathVariable int cid) {

        try {
//            상세조회 실행
            Optional<Customer> optionalCustomer = customerService.findById(cid);

            if (optionalCustomer.isPresent()) {
//                성공
                return new ResponseEntity<>(optionalCustomer.get(), HttpStatus.OK);
            } else {
//                데이터 없음
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
//            서버 에러
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 삭제함수
    @DeleteMapping("/customer/deletion/{cid}")
    public ResponseEntity<Object> delete(@PathVariable int cid) {

//        프론트엔드 쪽으로 상태정보를 보내줌
        try {
//            삭제함수 호출
            boolean bSuccess = customerService.removeById(cid);

            if (bSuccess == true) {
//                delete 문이 성공했을 경우
                return new ResponseEntity<>(HttpStatus.OK);
            }
//            delete 실패했을 경우( 0건 삭제가 될경우 )
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
//            DB 에러가 날경우
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}