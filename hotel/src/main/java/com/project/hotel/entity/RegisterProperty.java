package com.project.hotel.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class RegisterProperty {

	@Id 
	@GeneratedValue(generator="system-uuid")
	@GenericGenerator(name="system-uuid", strategy = "uuid")
	private String id;
	private String ownerName;
	private String ownerMobileNo;
	private String address1;
	private String address2;
	private String city;
	private String pinCode;
	private String state;
	private String landmark;
	private String imageUrl;
	private String typeOfProperty;
	private boolean isAvailable;
	private double price;






	public String getPinCode() {
		return pinCode;
	}






	public void setPinCode(String pinCode) {
		this.pinCode = pinCode;
	}






	public String getState() {
		return state;
	}






	public void setState(String state) {
		this.state = state;
	}






	public String getId() {
		return id;
	}






	public void setId(String id) {
		this.id = id;
	}






	public String getAddress1() {
		return address1;
	}






	public void setAddress1(String address1) {
		this.address1 = address1;
	}






	public String getAddress2() {
		return address2;
	}






	public void setAddress2(String address2) {
		this.address2 = address2;
	}






	public String getLandmark() {
		return landmark;
	}






	public void setLandmark(String landmark) {
		this.landmark = landmark;
	}






	public String getImageUrl() {
		return imageUrl;
	}






	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}






	public String getTypeOfProperty() {
		return typeOfProperty;
	}






	public void setTypeOfProperty(String typeOfProperty) {
		this.typeOfProperty = typeOfProperty;
	}






	public boolean isAvailable() {
		return isAvailable;
	}






	public void setAvailable(boolean isAvailable) {
		this.isAvailable = isAvailable;
	}






	public double getPrice() {
		return price;
	}






	public void setPrice(double price) {
		this.price = price;
	}






	public String getOwnerName() {
		return ownerName;
	}






	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}






	public String getOwnerMobileNo() {
		return ownerMobileNo;
	}






	public void setOwnerMobileNo(String ownerMobileNo) {
		this.ownerMobileNo = ownerMobileNo;
	}






	public String getCity() {
		return city;
	}






	public void setCity(String city) {
		this.city = city;
	}






	public RegisterProperty() {
		// TODO Auto-generated constructor stub
	}

}
