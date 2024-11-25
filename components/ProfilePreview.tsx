import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import analytics from '@react-native-firebase/analytics';
import { useSendbirdChat } from '@sendbird/uikit-react-native';
import * as svg from 'assets/svg';
import moment from 'moment';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  LayoutChangeEvent,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { ScaledSheet, scale, verticalScale } from 'react-native-size-matters';
import SocialMediaButton from 'src/components/SocialMediaButton';
import Tag from 'src/components/Tag';
import Colors from 'src/constants/colors';
import fontsConfig from 'src/constants/fonts';
import { VISIBLE_TAGS_AMOUNT } from 'src/constants/profile';
import { convertAvatarImagePath } from 'src/helpers/user';
import { DirectoryUser } from 'src/models/directory';
import { SocialMediaEnum, Trip, TripPlannedDatesEnum, User } from 'src/models/user';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user/selectors';
import { navigate } from 'src/services/navigation';
import { ProfileTheme } from 'src/types/profile';
import { openEmailClient, openWhatsApp } from 'src/utils/links';
import { removeSpaces } from 'src/utils/text';
import { sortAndCutTrips } from 'src/utils/trips';

type Props = {
  user: User | DirectoryUser;
  theme?: ProfileTheme;
  isCurrentUserProfile?: boolean;
};

const ProfilePreview: FC<Props> = ({ user, theme = ProfileTheme.BLACK, isCurrentUserProfile = false }) => {
  const profile = user?.profile;
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<any> | null>(null);
  const viewConfigRef = { viewAreaCoveragePercentThreshold: 95 };
  const [avatarWrapWidth, setAvatarWrapWidth] = useState(0);
  const currentUser = useAppSelector(userSelector);
  const [isTagsCollapsed, setIsTagsCollapsed] = useState(true);
  const [isTripsCollapsed, setIsTripsCollapsed] = useState(true);
  const [sortedTrips, setSortedTrips] = useState<Trip[]>([]);
  const { sdk, updateCurrentUserInfo } = useSendbirdChat();

  useEffect(() => {
    if (profile?.trips) {
      const filteredTrips = profile?.trips?.filter(trip => {
        if (trip.endDate && !trip.isTripEndDateAutomated) {
          return moment(trip.endDate).add(1, 'd').isSameOrAfter(moment());
        } else {
          const isTripPassed = moment(trip.startDate).add(1, 'd').isSameOrAfter(moment());
          if (!isTripPassed) {
            const isNextTripExists = profile?.trips?.find(t =>
              moment(t.startDate).isSameOrAfter(moment(trip.startDate)),
            );
            return !isNextTripExists;
          } else {
            return true;
          }
        }
      });
      const trips = filteredTrips?.slice().sort((a, b) => moment(a.startDate).diff(b.startDate));
      if (trips) {
        setSortedTrips(trips);
      }
    }
  }, [user]);

  const onAvatarWrapLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setAvatarWrapWidth(width);
  };

  const onViewRef = useRef(({ changed }: { changed: ViewToken[] }) => {
    if (changed[0].index !== null && changed[0].isViewable) {
      setActiveIndex(changed[0].index);
    }
  });

  const keyExtractor = useCallback((item: string, i: number) => {
    return `${i}`;
  }, []);

  const onOpenChatClick = async () => {
    if (currentUser && user && user.sendbirdUserId) {
      const channelUrl = await sdk.groupChannel.createDistinctChannelIfNotExist({
        invitedUserIds: [currentUser._id, user._id],
        isDistinct: true,
      });
      navigate('CHAT_SCREEN', { channelUrl: channelUrl.url });
    }
  };

  const handleSocialItemClick = async (link: string, socialName: string) => {
    const canOpen = await Linking.canOpenURL(link);
    if (link && canOpen) {
      analytics().logEvent('contact_btn_click', {
        viewerId: currentUser?._id,
        profileId: user?._id,
        social: socialName,
      });
      Linking.openURL(link);
    }
  };

  const handleWhatsAppClick = async () => {
    if (profile?.phoneNumber) {
      openWhatsApp(removeSpaces(profile.phoneNumber));

      if (!isCurrentUserProfile) {
        analytics().logEvent('contact_btn_click', {
          viewerId: currentUser?._id,
          profileId: user?._id,
          social: 'WhatsApp',
        });
      }
    }
  };

  const handleEmailPress = async () => {
    const email = user?.email;
    if (!email) return;
    openEmailClient(email);

    if (!isCurrentUserProfile) {
      analytics().logEvent('contact_btn_click', {
        viewerId: currentUser?._id,
        profileId: user?._id,
        social: 'Email',
      });
    }
  };

  const photos = profile.avatar ? [profile.avatar, ...(profile?.photos || [])] : [];

  const emailEnabled = user.profile?.contactPreferences?.includes(SocialMediaEnum.EMAIL);
  const whatsappEnabled = user.profile?.contactPreferences?.includes(SocialMediaEnum.WHATSAPP);
  const instagramEnabled = user.profile?.contactPreferences?.includes(SocialMediaEnum.INSTAGRAM);
  const linkedinEnabled = user.profile?.contactPreferences?.includes(SocialMediaEnum.LINKEDIN);

  const textColor = theme === ProfileTheme.BLACK ? Colors.black : Colors.primaryGreen;

  const defaultTags = useMemo(
    () => (!profile?.tags?.length ? [] : [...profile.tags].splice(0, VISIBLE_TAGS_AMOUNT)),
    [profile?.tags, isTagsCollapsed],
  );
  const tagsToShow = isTagsCollapsed ? defaultTags : profile?.tags;

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewWrap}>
      <View style={styles.containerHorizontal}>
        {profile.avatar && (
          <View
            style={[
              styles.avatarWrap,
              !!user.sendbirdUserId && { paddingBottom: 0, backgroundColor: '#E8E8FF', padding: 10 },
            ]}
            onLayout={onAvatarWrapLayout}>
            <FlatList
              contentContainerStyle={{ flexGrow: 1 }}
              data={photos}
              horizontal
              scrollEnabled={photos?.length > 1}
              showsHorizontalScrollIndicator={false}
              keyExtractor={keyExtractor}
              ref={ref => (flatListRef.current = ref)}
              snapToAlignment='center'
              pagingEnabled
              viewabilityConfig={viewConfigRef}
              onViewableItemsChanged={onViewRef.current}
              renderItem={({ item }) => (
                <View style={[styles.imageContainer, { width: avatarWrapWidth }]}>
                  <FastImage resizeMode='cover' style={styles.image} source={{ uri: convertAvatarImagePath(item) }} />
                </View>
              )}
            />
            {photos.length > 1 && (
              <View style={styles.dotContainer}>
                {photos.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      {
                        opacity: index === activeIndex ? 1 : 0.5,
                      },
                      styles.dot,
                    ]}
                  />
                ))}
              </View>
            )}
            {user.sendbirdUserId && (
              <TouchableOpacity style={{ padding: 15, alignItems: 'center' }} onPress={onOpenChatClick}>
                <Text
                  style={{
                    ...fontsConfig.blackDia,
                    fontSize: 16,
                    letterSpacing: -1,
                    textTransform: 'uppercase',
                    color: '#4C4CA0',
                  }}>
                  Message
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        <View style={styles.socialsWrap}>
          {user?.email && emailEnabled && (
            <SocialMediaButton
              textColor={textColor}
              style={[styles.socialBtn, theme === ProfileTheme.GREEN && styles.greenBtn]}
              onPress={() => handleEmailPress()}
              type={SocialMediaEnum.EMAIL}
              title=''
            />
          )}
          {whatsappEnabled && (
            <SocialMediaButton
              textColor={textColor}
              style={[styles.socialBtn, theme === ProfileTheme.GREEN && styles.greenBtn]}
              onPress={() => handleWhatsAppClick()}
              type={SocialMediaEnum.WHATSAPP}
              title=''
            />
          )}
          {!!profile?.instagram && instagramEnabled && (
            <SocialMediaButton
              textColor={textColor}
              style={[styles.socialBtn, theme === ProfileTheme.GREEN && styles.greenBtn]}
              onPress={() =>
                handleSocialItemClick(
                  `https://www.instagram.com/${profile?.instagram ? removeSpaces(profile?.instagram) : ''}` || '',
                  'Instagram',
                )
              }
              type={SocialMediaEnum.INSTAGRAM}
              title=''
            />
          )}
          {!!profile?.linkedin && linkedinEnabled && (
            <SocialMediaButton
              textColor={textColor}
              style={[styles.socialBtn, theme === ProfileTheme.GREEN && styles.greenBtn]}
              onPress={() =>
                handleSocialItemClick(
                  `https://www.linkedin.com/in/${profile?.linkedin ? removeSpaces(profile?.linkedin) : ''}` || '',
                  'Linkedin',
                )
              }
              type={SocialMediaEnum.LINKEDIN}
              title=''
            />
          )}
        </View>
        {!!profile && <Text style={[styles.nameText, { color: textColor }]}>{profile?.firstName}</Text>}
        <View style={styles.locationWrap}>
          {profile?.currentCityDetails?.googlePlaceId === profile?.homeCityDetails?.googlePlaceId ? (
            <View style={[styles.locationItem, { marginRight: 16 }]}>
              <svg.homeIcon width={20} height={20} color={textColor} style={{ marginRight: 4 }} />
              <svg.aimIcon width={20} height={20} color={textColor} />
              <Text style={[styles.locationText, { color: textColor }]}>
                {profile?.currentCityDetails?.name || 'N / A'}
              </Text>
            </View>
          ) : (
            <>
              {profile.homeCityDetails?.googlePlaceId && (
                <View style={[styles.locationItem, { marginRight: 16 }]}>
                  <svg.homeIcon width={20} height={20} color={textColor} />
                  <Text style={[styles.locationText, { color: textColor }]}>
                    {profile?.homeCityDetails?.name || 'N / A'}
                  </Text>
                </View>
              )}

              {profile.currentCityDetails?.googlePlaceId && (
                <View style={[styles.locationItem]}>
                  <svg.aimIcon width={20} height={20} color={textColor} />
                  <Text style={[styles.locationText, { color: textColor }]}>
                    {profile?.currentCityDetails?.name || 'N / A'}
                  </Text>
                </View>
              )}
            </>
          )}
        </View>
        <View style={styles.bioWrap}>
          <Text style={[styles.bioText, { color: textColor }]}>{profile?.aboutMe || ''}</Text>
        </View>
        <View style={styles.tagsWrap}>
          {tagsToShow?.map(tag => (
            <Tag
              color={textColor}
              key={tag.value}
              style={[styles.tag, theme === ProfileTheme.GREEN && styles.greenTag]}
              tag={tag}
            />
          ))}
        </View>
        {profile?.tags && profile?.tags?.length > VISIBLE_TAGS_AMOUNT && (
          <TouchableOpacity style={styles.showAllTagsBtn} onPress={() => setIsTagsCollapsed(prev => !prev)}>
            <Text style={[styles.showAllTagsBtnText, { color: textColor }]}>
              {isTagsCollapsed ? 'View all tags' : 'Hide tags'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.containerHorizontal}>
        {sortedTrips && sortedTrips.length > 0 && (
          <TouchableOpacity
            style={[styles.tripsContainer, theme === ProfileTheme.GREEN && { backgroundColor: '#C1F2B6' }]}
            onPress={() => {
              setIsTripsCollapsed(!isTripsCollapsed);
            }}>
            <View style={styles.tripsCollapsedContainer}>
              <svg.planeIcon width={24} height={24} color={Colors.primaryGreen} />
              <Text style={styles.tripsText}>
                {sortedTrips.length > 2 ? `${sortAndCutTrips(sortedTrips)} and more` : sortAndCutTrips(sortedTrips)}
              </Text>
              <svg.longArrowRight
                width={scale(16)}
                height={scale(16)}
                color={Colors.primaryGreen}
                style={{
                  marginLeft: 12,
                  transform: [{ rotate: isTripsCollapsed ? '90deg' : '-90deg' }],
                }}
              />
            </View>
            {!isTripsCollapsed && (
              <View style={styles.tripsExpandedContainer}>
                {sortedTrips.map(trip => (
                  <View style={styles.tripsExpandedItem}>
                    <Text style={styles.tripsExpandedTitle}>{trip.placeDetails.name.toUpperCase()}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                      <Text style={styles.tripsExpabdedDatesText}>{`${moment(trip.startDate)
                        .utc(false)
                        .format(trip.plannedDates === TripPlannedDatesEnum.ONLY_MONTHS ? 'MMMM' : 'MMMM D')} - ${
                        trip.endDate && !trip.isTripEndDateAutomated
                          ? moment(trip.endDate)
                              .utc(false)
                              .format(trip.plannedDates === TripPlannedDatesEnum.ONLY_MONTHS ? 'MMMM' : 'MMMM D')
                          : ''
                      }`}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </TouchableOpacity>
        )}
        <View style={styles.travelWrap}>
          <Text style={[styles.travelTitle, { color: textColor }]}>TRAVEL STORY</Text>
          <Text style={[styles.travelText, { color: textColor }]}>{profile?.travelStory}</Text>
        </View>
        {profile?.perfectDay && (
          <View style={styles.promptWrap}>
            <Text style={[styles.promptTitle, { color: textColor }]}>PERFECT DAY</Text>
            <Text style={[styles.promptText, { color: textColor }]}>{profile?.perfectDay || ''}</Text>
          </View>
        )}
        {profile?.fuckMarryKillCities && (
          <View style={styles.promptWrap}>
            <Text style={[styles.promptTitle, { color: textColor }]}>F*CK. MARRY. KILL. CITY EDITION</Text>
            <Text style={[styles.promptText, { color: textColor }]}>{profile?.fuckMarryKillCities}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ProfilePreview;

const styles = ScaledSheet.create({
  scrollViewWrap: {
    paddingTop: verticalScale(12),
  },
  imageContainer: {
    width: SCREEN_WIDTH - scale(39.5),
  },
  containerHorizontal: {
    paddingHorizontal: 24,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  dotContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    bottom: verticalScale(12),
  },
  dot: {
    width: 6,
    height: 6,
    margin: 3,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  avatarWrap: {
    position: 'relative',
    width: '100%',
    height: verticalScale(317),
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: verticalScale(24),
  },
  nameText: {
    ...fontsConfig.regularBeaufort,
    fontSize: scale(45),
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: verticalScale(17),
  },
  socialsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: verticalScale(22),
    justifyContent: 'space-between',
    gap: scale(6),
  },
  socialBtn: {
    flexGrow: 1,
    alignItems: 'center',
  },
  greenBtn: {
    backgroundColor: Colors.greenAlpha,
    borderColor: Colors.lightGreen,
  },
  tripsContainer: {
    backgroundColor: Colors.primaryGray,
    paddingVertical: 16,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.primaryGreen,
    borderRadius: 8,
  },
  tripsCollapsedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tripsExpandedContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  tripsExpandedItem: {
    marginTop: 24,
    alignItems: 'center',
  },
  tripsExpandedTitle: {
    ...fontsConfig.blackDia,
    fontSize: 12,
    color: Colors.primaryGreen,
  },
  tripsExpabdedDatesText: {
    ...fontsConfig.regularDia,
    fontSize: 12,
    marginTop: 12,
    color: Colors.primaryGreen,
  },
  tripsText: {
    ...fontsConfig.regularDia,
    fontSize: 14,
    color: Colors.primaryGreen,
    marginLeft: 12,
  },
  locationWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: verticalScale(26.5),
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    ...fontsConfig.regularBeaufort,
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 8,
  },
  bioWrap: {
    marginBottom: verticalScale(24),
  },
  bioText: {
    ...fontsConfig.regularBeaufort,
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '400',
    textAlign: 'center',
  },
  tagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: verticalScale(24),
  },
  tag: {
    marginRight: 8,
    marginBottom: 8,
  },
  greenTag: {
    backgroundColor: Colors.greenAlpha,
    borderColor: Colors.lightGreen,
  },
  travelWrap: {
    marginBottom: verticalScale(24),
    alignItems: 'center',
  },
  travelTitle: {
    ...fontsConfig.boldDia,
    fontSize: 12,
    lineHeight: 14,
    fontWeight: '900',
    marginBottom: verticalScale(12),
  },
  travelText: {
    ...fontsConfig.regularBeaufort,
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '400',
    textAlign: 'center',
  },
  carousel: {
    position: 'relative',
    marginBottom: verticalScale(24),
  },
  promptWrap: {
    marginBottom: verticalScale(24),
    alignItems: 'center',
  },
  promptTitle: {
    ...fontsConfig.boldDia,
    fontSize: 12,
    lineHeight: 14,
    fontWeight: '900',
    marginBottom: verticalScale(12),
  },
  promptText: {
    ...fontsConfig.regularBeaufort,
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '400',
    textAlign: 'center',
  },
  showAllTagsBtn: {
    width: '100%',
    alignItems: 'center',
    marginBottom: verticalScale(21),
  },
  showAllTagsBtnText: {
    ...fontsConfig.regularDia,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: Colors.black,
    textTransform: 'uppercase',
    textDecorationLine: 'underline',
  },
});
