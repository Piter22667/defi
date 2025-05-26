package com.example.defi.defi.service;

import com.example.defi.defi.dto.ChainDto;
import com.example.defi.defi.dto.DexDto;
import com.example.defi.defi.dto.UsdCirculationDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DefiLamaService {
    public List<ChainDto> getTvlByChain();

    public List<DexDto> getDexVolume();

    public List<UsdCirculationDto> getUsdCirculation();



}
