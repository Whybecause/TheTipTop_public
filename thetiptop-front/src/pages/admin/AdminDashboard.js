import React, { useEffect, useState } from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import addDays from 'date-fns/addDays';

import { adminService } from '../../services/adminService';
import Layout from '../../components/layout/Layout';
import UserStats from '../../components/admin/dashboard/UserStats';
import GiftStats from '../../components/admin/dashboard/GiftStats';
import Loading from '../../components/layout/Loading';
import GameSettings from '../../components/admin/dashboard/GameSettings';
import FinalWinner from '../../components/admin/dashboard/FinalWinner';
import { gameService } from '../../services/gameService';
import GenerateGifts from '../../components/admin/dashboard/GenerateGifts';

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [userStats, setUserStats] = useState({});
  const [giftStats, setGiftStats] = useState({});
  const [game, setGame] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(startDate, 1));
  // Used to refresh the gifts state after creating or deleting gifts
  const [giftsCreated, setGiftCreated] = useState(false);

  const getStats = async () => {
    try {
      const result = await adminService.getStats();
      setUserStats(result.data.content.userStats);
      setGiftStats(result.data.content.giftStats);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getGame = async () => {
    const result = await gameService.getGame();
    if (result.data.content !== null) {
      setGame(result.data.content);
      setStartDate(new Date(result.data.content.startDate));
      setEndDate(new Date(result.data.content.endDate));
    }
  };

  useEffect(() => {
    getStats();
  }, [giftsCreated]);

  useEffect(() => {
    getGame();
  }, []);

  return (
    <Layout
      metaTitle="Admin Dashboard"
      showAdminSidebar={true}
      width='full'
      withDefaultPadding={true}
    >
      <SimpleGrid
        mt='5'
        columns={[1, 1, 1, 1, 3]}
        spacingY='2em'
        spacingX='1em'
      >
        <GenerateGifts setGiftCreated={setGiftCreated}/>

        <GameSettings
          game={game}
          setGame={setGame}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        <FinalWinner game={game} />
      </SimpleGrid>

      <Loading isLoading={isLoading}>
        {Object.keys(userStats).length > 0 && (
          <UserStats userStats={userStats} />
        )}

        {Object.keys(giftStats).length > 0 && (
          <GiftStats giftStats={giftStats} />
        )}

      </Loading>
    </Layout>
  );
}

