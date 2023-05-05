import { Button, Dropdown, Link, Navbar, Text } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Magic } from 'magic-sdk';
import icons from './Icons';
import { magicLinkPk } from '../config';

let magic;
if (typeof window !== 'undefined') {
  magic = new Magic(magicLinkPk);
}

const navItems = [
  {
    title: 'Gallery',
    link: '/gallery',
  },
  {
    title: 'Contact',
    link: '/contact',
  },
  {
    title: 'About',
    link: '/about',
  },
];

const featuresDropdownItems = [
  {
    key: 'playground',
    showFullDescription: true,
    description: 'Generate AI prompt',
    icon: icons.user,
    title: 'Playground',
    link: '/',
  },
  {
    key: 'portrait_photo',
    showFullDescription: true,
    description: 'Generate portrait photos from your imagination',
    icon: icons.scale,
    title: 'Portrait photo',
    link: '/portrait',
  },
  {
    key: 'food_photo',
    showFullDescription: true,
    description: 'Generate food photos from your own recipe',
    icon: icons.activity,
    title: 'Food photo',
    link: '/food',
  },
  {
    key: 'baby_photo',
    showFullDescription: true,
    description: 'Generate cute baby photos from your own description',
    icon: icons.flash,
    title: 'Baby photo',
    link: '/baby',
  },
  {
    key: 'fashion_photo',
    showFullDescription: true,
    description: 'Generate fashion photos from your own description',
    icon: icons.server,
    title: 'Fashion photo',
    link: '/fashion',
  },
];

function PlaceholderLogo() {
  return <span>&nbsp;&nbsp;&nbsp;</span>;
}

async function logout() {
  await magic.user.logout();
  localStorage.removeItem('user_data');
  localStorage.removeItem('is_logged_on');
  window.location.href = '/login';
}

function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);

  // if the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}

function NavigationBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(getWithExpiry('is_logged_on') === 'on');
  }, []);

  const { asPath } = useRouter();
  return (
    <Navbar isBordered variant="floating">
      <Navbar.Toggle aria-label="toggle navigation" showIn="xs" />
      <Navbar.Brand>
        <PlaceholderLogo />
        <Text b color="inherit">
          <Link href="/">CrewAI</Link>
        </Text>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs">
        <Dropdown isBordered>
          <Navbar.Item>
            <Dropdown.Button
              auto
              light
              css={{
                px: 0,
                dflex: 'center',
                svg: { pe: 'none' },
              }}
              iconRight={icons.chevron}
              ripple={false}
            >
              Features
            </Dropdown.Button>
          </Navbar.Item>
          <Dropdown.Menu
            aria-label="ACME features"
            css={{
              $$dropdownMenuWidth: '340px',
              $$dropdownItemHeight: '70px',
              '& .nextui-dropdown-item': {
                py: '$4',
                // dropdown item left icon
                svg: {
                  color: '$secondary',
                  mr: '$4',
                },
                // dropdown item title
                '& .nextui-dropdown-item-content': {
                  w: '100%',
                  fontWeight: '$semibold',
                },
              },
            }}
          >
            {featuresDropdownItems.map((item) => (
              <Dropdown.Item
                key={item.key}
                showFullDescription={item.showFullDescription}
                description={item.description}
                icon={item.icon}
              >
                <Link href={item.link}>{item.title}</Link>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        {navItems.map((item) => (
          <Navbar.Link
            isActive={asPath === item.link}
            key={item.link}
            href={item.link}
          >
            {item.title}
          </Navbar.Link>
        ))}
      </Navbar.Content>
      <Navbar.Collapse showIn="xs">
        {navItems.map((item) => (
          <Navbar.CollapseItem isActive={asPath === item.link} key={item.link}>
            <Link href={item.link}>{item.title}</Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
      <Navbar.Content>
        {!isLoggedIn ? (
          <Navbar.Item>
            <Button auto flat as={Link} href="/login">
              Login
            </Button>
          </Navbar.Item>
        ) : (
          <>
            <Navbar.Link color="inherit" onPress={() => logout()}>
              Logout
            </Navbar.Link>
            <Navbar.Item>
              <Button auto flat as={Link} href="/profile">
                Profile
              </Button>
            </Navbar.Item>
          </>
        )}
      </Navbar.Content>
    </Navbar>
  );
}

export default NavigationBar;
