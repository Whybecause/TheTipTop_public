import React from 'react';
import { Icon } from '@chakra-ui/icons';
import { Button, Stack } from '@chakra-ui/react';
import { AiOutlineCloudDownload } from 'react-icons/ai';

import { adminService } from '../../../services/adminService';

function EmailExport() {
  const handleEmailExport = async () => {
    await adminService.downloadEmailCSV();
  };

  return (
    <Stack direction='row' spacing={4} pb='5'>
      <Button
        leftIcon={<Icon w='25px' h='25px' as={AiOutlineCloudDownload} />}
        onClick={handleEmailExport}
        colorScheme='green'
        variant='outline'>
          Newsletter Emails
      </Button>

    </Stack>
  );
}

export default EmailExport;
