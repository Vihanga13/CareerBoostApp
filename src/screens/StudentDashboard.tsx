import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  FadeInDown,
  FadeInUp,
  SlideInRight,
} from 'react-native-reanimated';
import {
  Briefcase,
  FileText,
  Target,
  MessageCircle,
  Bell,
  BookOpen,
  Lightbulb,
  CheckCircle2,
  TrendingUp,
  BookmarkPlus,
} from 'lucide-react-native';
import AnimatedBackground from '../components/AnimatedBackground';

const { width } = Dimensions.get('window');

const StudentDashboard = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([
    { id: 1, company: 'Tech Corp', message: 'Your application was viewed' },
    { id: 2, company: 'InnovateLab', message: 'New internship match!' },
  ]);

  const careerStats = {
    resumeProgress: 75,
    jobMatches: 8,
    appliedJobs: 5,
    savedJobs: 12,
    skillGaps: ['React Native', 'Node.js'],
    interviews: 2,
  };

  const quickActions = [
    {
      title: 'Continue Resume',
      icon: FileText,
      screen: 'Resume',
      color: '#7C3AED',
      progress: `${careerStats.resumeProgress}%`,
    },
    {
      title: 'Job Matches',
      icon: Target,
      screen: 'Listings',
      color: '#2563EB',
      count: careerStats.jobMatches,
    },
    {
      title: 'Saved Jobs',
      icon: BookmarkPlus,
      screen: 'SavedJobs',
      color: '#059669',
      count: careerStats.savedJobs,
    },
    {
      title: 'Interview Prep',
      icon: MessageCircle,
      screen: 'Interview Tips',
      color: '#EA580C',
      count: careerStats.interviews,
    },
  ];

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Notification */}
        <Animated.View 
          entering={FadeInDown.delay(200).springify()}
          style={styles.header}
        >
          <View>
            <Text style={styles.greeting}>Hello,</Text>
            <Text style={styles.userName}>Alex Smith</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color="#1E293B" />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>{notifications.length}</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Career Progress Summary */}
        <Animated.View 
          entering={FadeInDown.delay(400).springify()}
          style={styles.progressCard}
        >
          <View style={styles.progressHeader}>
            <TrendingUp size={24} color="#2563EB" />
            <Text style={styles.progressTitle}>Career Progress</Text>
          </View>
          <View style={styles.progressStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{careerStats.appliedJobs}</Text>
              <Text style={styles.statLabel}>Applied</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{careerStats.jobMatches}</Text>
              <Text style={styles.statLabel}>Matches</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{careerStats.interviews}</Text>
              <Text style={styles.statLabel}>Interviews</Text>
            </View>
          </View>
        </Animated.View>

        {/* Quick Actions Grid */}
        <Animated.View 
          entering={FadeInUp.delay(600).springify()}
          style={styles.quickActionsGrid}
        >
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={action.title}
              style={styles.actionCard}
              onPress={() => navigation.navigate(action.screen)}
              activeOpacity={0.7}
            >
              <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                <action.icon size={24} color="#fff" />
              </View>
              <Text style={styles.actionTitle}>{action.title}</Text>
              {action.progress ? (
                <Text style={[styles.actionMeta, { color: action.color }]}>
                  {action.progress} complete
                </Text>
              ) : (
                <Text style={[styles.actionMeta, { color: action.color }]}>
                  {action.count} new
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* AI Skill Suggestions */}
        <Animated.View 
          entering={FadeInUp.delay(800).springify()}
          style={styles.suggestionCard}
        >
          <View style={styles.cardHeader}>
            <Lightbulb size={24} color="#2563EB" />
            <Text style={styles.cardTitle}>Recommended Skills</Text>
          </View>
          <View style={styles.skillsList}>
            {careerStats.skillGaps.map((skill, index) => (
              <View key={skill} style={styles.skillItem}>
                <BookOpen size={16} color="#64748B" />
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.viewMoreButton}>
            <Text style={styles.viewMoreText}>View Skill Analysis</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Recent Notifications */}
        <Animated.View 
          entering={FadeInUp.delay(1000).springify()}
          style={styles.notificationsCard}
        >
          <View style={styles.cardHeader}>
            <Bell size={24} color="#2563EB" />
            <Text style={styles.cardTitle}>Recent Updates</Text>
          </View>
          {notifications.map((notification) => (
            <View key={notification.id} style={styles.notificationItem}>
              <View style={styles.notificationDot} />
              <View>
                <Text style={styles.notificationCompany}>{notification.company}</Text>
                <Text style={styles.notificationText}>{notification.message}</Text>
              </View>
            </View>
          ))}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: '#64748B',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  progressCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginLeft: 8,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E2E8F0',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  actionCard: {
    width: (width - 48) / 2,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  actionMeta: {
    fontSize: 14,
    fontWeight: '500',
  },
  suggestionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginLeft: 8,
  },
  skillsList: {
    gap: 12,
  },
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  skillText: {
    fontSize: 14,
    color: '#334155',
  },
  viewMoreButton: {
    marginTop: 16,
    alignSelf: 'flex-start',
  },
  viewMoreText: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '600',
  },
  notificationsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    gap: 12,
  },
  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563EB',
  },
  notificationCompany: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  notificationText: {
    fontSize: 14,
    color: '#64748B',
  },
});

export default StudentDashboard;
