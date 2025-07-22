package com.bkfruits.service;

import com.bkfruits.exception.ResourceNotFoundException;
import com.bkfruits.model.Service;
import com.bkfruits.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@org.springframework.stereotype.Service
@Transactional
public class ServiceService {

    @Autowired
    private ServiceRepository serviceRepository;

    public Service createService(Service service) {
        return serviceRepository.save(service);
    }

    public Service updateService(Long id, Service serviceDetails) {
        Service service = findById(id);
        
        service.setTitle(serviceDetails.getTitle());
        service.setDescription(serviceDetails.getDescription());
        service.setIcon(serviceDetails.getIcon());
        service.setFeatures(serviceDetails.getFeatures());
        
        return serviceRepository.save(service);
    }

    public void deleteService(Long id) {
        Service service = findById(id);
        serviceRepository.delete(service);
    }

    @Transactional(readOnly = true)
    public Service findById(Long id) {
        return serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service", "id", id));
    }

    @Transactional(readOnly = true)
    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Service> searchServices(String keyword) {
        return serviceRepository.findByTitleContainingOrDescriptionContaining(keyword);
    }

    @Transactional(readOnly = true)
    public List<Service> getServicesByTitle(String title) {
        return serviceRepository.findByTitleContaining(title);
    }
}