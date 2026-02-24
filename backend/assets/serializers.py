from rest_framework import serializers
from .models import Asset, Booking, Location, Category, SubCategory
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username')

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('id','name','description')

class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = ('id', 'name', 'category')

class CategorySerializer(serializers.ModelSerializer):
    subcategories = SubCategorySerializer(many=True, read_only=True)
    
    class Meta:
        model = Category
        fields = ('id', 'name', 'subcategories')

class AssetSerializer(serializers.ModelSerializer):
    location = LocationSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(write_only=True, source='category', queryset=Category.objects.all(), allow_null=True)
    subcategory = SubCategorySerializer(read_only=True)
    subcategory_id = serializers.PrimaryKeyRelatedField(write_only=True, source='subcategory', queryset=SubCategory.objects.all(), allow_null=True)
    image_url = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    
    class Meta:
        model = Asset
        fields = ('id','name','description','details','serial_number','location','category','category_id','subcategory','subcategory_id','available','image','image_url', 'status')
    
    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None

    def get_status(self, obj):
        if not obj.available:
            return 'Out of Stock'
        from django.utils import timezone
        now = timezone.now()
        # Check for current bookings
        current_bookings = obj.bookings.filter(start_datetime__lte=now, end_datetime__gte=now)
        if current_bookings.filter(status='accepted').exists():
            return 'Out of Stock'
        if current_bookings.filter(status='pending').exists():
            return 'Pending'
        return 'Available'

class BookingSerializer(serializers.ModelSerializer):
    asset = AssetSerializer(read_only=True)
    asset_id = serializers.PrimaryKeyRelatedField(write_only=True, source='asset', queryset=Asset.objects.all())
    user = UserSerializer(read_only=True)
    contact_location = LocationSerializer(read_only=True)
    contact_location_id = serializers.PrimaryKeyRelatedField(
        write_only=True,
        source='contact_location',
        queryset=Location.objects.all(),
        allow_null=True,
        required=False
    )

    class Meta:
        model = Booking
        fields = (
            'id',
            'asset',
            'asset_id',
            'user',
            'start_datetime',
            'end_datetime',
            'purpose',
            'contact_name',
            'contact_email',
            'contact_mobile',
            'contact_address',
            'contact_location',
            'contact_location_id',
            'created_at',
            'status',
            'received_image',
            'received_at',
            'returned_image',
            'returned_at'
        )
        read_only_fields = ('status', 'received_at', 'returned_at')

    def validate(self, data):
        start = data.get('start_datetime') or getattr(self.instance, 'start_datetime', None)
        end = data.get('end_datetime') or getattr(self.instance, 'end_datetime', None)
        if start and end and start >= end:
            raise serializers.ValidationError('End must be after start.')
        
        from django.utils import timezone
        # If this is a new booking (no instance) or start time is being changed
        if not self.instance and start and start < timezone.now():
             raise serializers.ValidationError({"start_datetime": "Booking start time cannot be in the past."})
             
        return data
